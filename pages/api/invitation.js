const axios = require("axios").default;
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  //transporter options
  const host = "applications.com.pl";
  const auth = {
    user: "annachatterbox@applications.com.pl",
    pass: "Marekhlasko1",
  };

  //message options
  const from = "Anna";
  const receiver = req.body.data.email;
  const subject = "Welcome in my newsletter";
  const message = `<div style='max-width:600px; margin:0 auto; font-size: 1rem; font-family: Amiri,serif;'><h1 style='color: #7ed56f; padding:30px 0px; font-size:2rem; font-family: Times New Roman,Times,serif; text-align: center; border-top: 1px solid; border-bottom: 1px solid;'>Hi, ${req.body.data.name} !</h1><p>Cieszę, się niezmiernie, że wybrałeś mój newsletter. Spodziewaj się  newsów na początku każdego miesiąca ! <br> Pozdrawiam Anna Chatterbox </p></div>`;

  try {
    //SECTION: AUTHENTICATION
    const checkToken = await axios
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
        res.status(405).json({
          status: "fail",
          data: {
            message: "Bad autorization",
          },
        });
        throw "exit";
      });
    const token = checkToken.data.jwt;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    //SECTION: CHECK EMAIL
    const checkEmail = await axios
      .get(
        `${
          process.env.DEVELOPMENT_BACKEND_HOST
            ? process.env.DEVELOPMENT_BACKEND_HOST
            : process.env.PRODUCTION_BACKEND_HOST
        }/api/newsletters?filters[$and][0][email][$eq]=${receiver}`,
        config
      )
      .catch(function (error) {
        res.status(405).json({
          status: "fail",
          data: {
            message: "Wrong check mail",
          },
        });
      });

    if (checkEmail.data.data.length !== 0) {
      res.status(405).json({
        status: "fail",
        data: {
          message: "This e-mail has been registered",
        },
      });
      throw "exit";
    }
    //SECTION: SEND EMAIL
    await axios
      .post("https://applications.com.pl/api/v1/mail-sender", {
        host,
        auth,
        from,
        receiver,
        subject,
        message,
      })
      .catch(function (error) {
        res.status(405).json({
          status: "fail",
          data: {
            message: "Something is wrong with sending the email",
          },
        });
        throw "exit";
      });
    //SECTION: ADD EMAIL TO NEWSLETTER
    await axios
      .post(
        `${
          process.env.DEVELOPMENT_BACKEND_HOST
            ? process.env.DEVELOPMENT_BACKEND_HOST
            : process.env.PRODUCTION_BACKEND_HOST
        }/api/newsletters`,
        req.body
      )
      .catch(function (error) {
        res.status(405).json({
          status: "fail",
          data: {
            message: "Somethig was wrong with email add...",
          },
        });
        throw "exit";
      });
    res.status(200).json({
      status: "success",
      data: {
        message: "Email was added and sended",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
