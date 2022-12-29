import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Introducer from "../components/Introducer";
import Newsletter from "../components/Newsletter";
export default function Home({
  posts,
  polishText,
  englishText,
  polishIntro,
  englishIntro,
}) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Introducer
        className="introducer"
        ptext={polishText}
        etext={englishText}
        pintro={polishIntro}
        eintro={englishIntro}
      />
      <main>
        <h2 className="heading-recent-posts">
          <span className="span-1">Zobacz</span>{" "}
          <span className="span-2">moje</span>{" "}
          <span className="span-3">najnowsze</span>{" "}
          <span className="span-4">posty</span>....
        </h2>
        {posts.map((p) => {
          return (
            <div className="post-intro" key={p.id}>
              <div className="post-intro__header">
                <div className="post-intro__title">
                  <Link
                    href={`/${p.attributes.category.data.attributes.slug}/${p.attributes.slug}`}
                  >
                    <a>
                      <h2>
                        <span>
                          {" "}
                          {p.attributes.title}{" "}
                          <span className="post-intro__catid">
                            | {p.attributes.category.data.attributes.name}
                          </span>
                        </span>
                        <span
                          className={`post-intro__level-button post-intro__level-button--${
                            p.attributes.level.data !== null
                              ? p.attributes.level.data.attributes.value
                              : "none"
                          }`}
                        ></span>
                      </h2>
                    </a>
                  </Link>
                </div>
                <div className="post-intro__date">
                  <span>{p.attributes.commit}</span>
                </div>
              </div>
              <div className="post-intro__dsc">
                {" "}
                <div className="image post-intro__img">
                  {" "}
                  <Image
                    src={p.attributes.cover.data.attributes.url}
                    width="200px"
                    height="200px"
                    quality={100}
                  ></Image>
                </div>
                <div className="post-intro__paragraph">
                  {" "}
                  <p>{p.attributes.description}</p>
                  <Link
                    href={`/${p.attributes.category.data.attributes.slug}/${p.attributes.slug}`}
                  >
                    <a className="standard-btn">
                      <span>Czytaj dalej</span>
                    </a>
                  </Link>
                </div>
              </div>
              <hr></hr>
            </div>
          );
        })}
        <Newsletter></Newsletter>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res1 = await fetch(
    `${
      process.env.DEVELOPMENT_BACKEND_HOST
        ? process.env.DEVELOPMENT_BACKEND_HOST
        : process.env.PRODUCTION_BACKEND_HOST
    }/api/articles?sort[0]=commit:desc&pagination[page]=1&pagination[pageSize]=5&populate=*`
  );
  const res2 = await fetch(
    `${
      process.env.DEVELOPMENT_BACKEND_HOST
        ? process.env.DEVELOPMENT_BACKEND_HOST
        : process.env.PRODUCTION_BACKEND_HOST
    }/api/categories/`
  );
  const strapi1 = await res1.json();
  const strapi2 = await res2.json();
  const res3 = await fetch(
    `${
      process.env.DEVELOPMENT_BACKEND_HOST
        ? process.env.DEVELOPMENT_BACKEND_HOST
        : process.env.PRODUCTION_BACKEND_HOST
    }/api/polish-introducer?populate=*`
  );
  const strapi3 = await res3.json();
  const res4 = await fetch(
    `${
      process.env.DEVELOPMENT_BACKEND_HOST
        ? process.env.DEVELOPMENT_BACKEND_HOST
        : process.env.PRODUCTION_BACKEND_HOST
    }/api/english-introducer?populate=*`
  );
  const strapi4 = await res4.json();
  return {
    props: {
      posts: strapi1.data,
      categories: strapi2.data,
      polishText: strapi3.data.attributes.text,
      englishText: strapi4.data.attributes.text,
      polishIntro: strapi3.data.attributes.intro.data.attributes.url,
      englishIntro: strapi4.data.attributes.intro.data.attributes.url,
    },
    revalidate: 10,
  };
}
