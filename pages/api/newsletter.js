const axios = require("axios").default;
export default async function handler(req, res) {
  //SECTION: SET VARIABLES
  const auth = {
    user: "annachatterbox@applications.com.pl",
    pass: "Marekhlasko1",
  };
  const from = "Anna";
  const subject = "Annachatterbox - Monthly Newsletter";
  let message = `<h1 style='color: #7ed56f; padding:30px 0px; font-size:2rem; font-family: Times New Roman,Times,serif; text-align: center; border-top: 1px solid; border-bottom: 1px solid;'>Hi, $name$ !</h1><p>I have some new articles from last month. Are you intrested ?</p>`;

  try {
    //SECTION: AUTHENTICATION
    const res1 = await axios
      .post(
        `${
          process.env.DEVELOPMENT_BACKEND_HOST
            ? process.env.DEVELOPMENT_BACKEND_HOST
            : process.env.PRODUCTION_BACKEND_HOST
        }/api/auth/local`,
        {
          identifier: "auth-client",
          password: "Pa$$w0rd",
        }
      )
      .catch(function (error) {
        throw "exit";
      });
    const token = res1.data.jwt;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    //SECTION: TAKE EMAILS
    const res2 = await axios
      .get(
        `${
          process.env.DEVELOPMENT_BACKEND_HOST
            ? process.env.DEVELOPMENT_BACKEND_HOST
            : process.env.PRODUCTION_BACKEND_HOST
        }/api/newsletters`,
        config
      )
      .catch(function (error) {
        throw "exit";
      });

    //SECTION: TAKE CATEGORIES
    const res3 = await axios
      .get(
        `${
          process.env.DEVELOPMENT_BACKEND_HOST
            ? process.env.DEVELOPMENT_BACKEND_HOST
            : process.env.PRODUCTION_BACKEND_HOST
        }/api/categories`
      )
      .catch(function (error) {
        throw "exit";
      });

    //SECTION: SET DATE
    const date = new Date();
    // const date = new Date("2022-04-26");
    let ltYear = date.getFullYear();
    let gteYear = ltYear;
    let ltMonth = date.getMonth() + 1;
    let gteMonth = date.getMonth();
    if (gteMonth === 0) {
      gteMonth = 12;
      gteYear = gteYear - 1;
    }

    if (ltMonth < 10) {
      ltMonth.toString();
      ltMonth = "0" + ltMonth;
    }
    if (gteMonth < 10) {
      gteMonth.toString();
      gteMonth = "0" + gteMonth;
    }

    //SECTION: TAKE ARTICLES
    const res4 = await axios
      .get(
        `${
          process.env.DEVELOPMENT_BACKEND_HOST
            ? process.env.DEVELOPMENT_BACKEND_HOST
            : process.env.PRODUCTION_BACKEND_HOST
        }/api/articles?filters[$and][0][commit][$lt]=${ltYear}-${ltMonth}-01T00:00:00.000Z&filters[$and][1][commit][$gte]=${gteYear}-${gteMonth}-01T00:00:00.000Z&populate=*`
      )
      .catch(function (error) {
        throw "exit";
      });
    if (res4.data.data.length === 0) {
      console.log("Brak artykułów");
      throw "exit";
    }
    //SECTION: PREPARE MESSAGE
    const emails = res2.data.data.map((el) => {
      const object = {};
      object.name = el.attributes.name;
      object.email = el.attributes.email;
      return object;
    });
    const categories = res3.data.data.map((el) => el.attributes.name);
    const articles = res4.data.data.map((el) => {
      const object = {};
      object.title = el.attributes.title;
      object.description = el.attributes.description;
      object.slug = el.attributes.slug;
      object.category = el.attributes.category.data.attributes.name;
      if (el.attributes.level.data)
        object.level = el.attributes.level.data.attributes.value;
      return object;
    });

    categories.forEach((el, i) => {
      const category = el;
      const articlesByCat = articles.filter(function (el) {
        return el.category == category;
      });
      if (articlesByCat.length !== 0) {
        message = message + `<h2 style='color: #e03616;'>${category}</h2>`;
        articlesByCat.forEach((el) => {
          if (el.level) {
            if (el.level === "easy") {
              el.level = `<span style="background-color: green; color: #fff; text-transform: uppercase; font-size: 13px; padding: 0px 10px; line-height: 2; float: right;">${el.level}</span>`;
            }
            if (el.level === "medium") {
              el.level = `<span style="background-color: blue; color: #fff; text-transform: uppercase; font-size: 13px; padding: 0px 10px; line-height: 2; float: right;">${el.level}</span>`;
            }
            if (el.level === "hard") {
              el.level = `<span style="background-color: #ff5b00; color: #fff; text-transform: uppercase; font-size: 13px; padding: 0px 10px; line-height: 2; float: right;">${el.level}</span>`;
            }
            if (el.level === "master") {
              el.level = `<span style="background-color: red; color: #fff; text-transform: uppercase; font-size: 13px; padding: 0px 10px; line-height: 2; float: right;">${el.level}</span>`;
            }
          }
          message =
            message +
            `<h3><a style="display: inline-block; float: left; max-width: 70%" href='http://annachatterbox.netlify.app/${
              el.category
            }/${el.slug}' target='_blank'>${el.title}</a>${
              el.level ? el.level : ""
            }<span style="clear: both; display: block"></span></h3><p style="margin-bottom: 40px">${
              el.description
            }</p>`;
        });
        message = message + "<hr>";
      }
    });
    message =
      `<div style='max-width:600px; margin:0 auto; font-size: 1rem; font-family: Amiri,serif;'>` +
      message +
      "<p>Enjoy and have a fun !</p></div>";

    //SECTION: SEND REQUEST TO NEWSLETTER APP
    const request = {
      auth,
      from,
      subject,
      message,
      emails,
    };
    await axios
      .post("https://applications.com.pl/api/v1/newsletter-sender", request)
      .catch(function (error) {
        throw "exit";
      });
    res.status(200).json({
      status: "success",
      data: {
        message: "Newsletter has launched",
      },
    });
  } catch (error) {
    res.status(405).send(error);
  }
}
