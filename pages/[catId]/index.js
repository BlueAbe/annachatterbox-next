import React from "react";
import Link from "next/link";
export default function Category({ posts }) {
  return (
    <>
      {posts.map((p) => {
        return (
          <Link
            key={p.id}
            href={`/${p.attributes.category.data.attributes.name}/${p.attributes.slug}`}
          >
            <a>
              <div>
                <h2>
                  {p.attributes.category.data.attributes.name} -
                  {p.attributes.title}
                </h2>
                <p>{p.attributes.description}</p>
              </div>
              <hr></hr>
            </a>
          </Link>
        );
      })}
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/categories/");
  const strapi = await res.json();
  const paths = strapi.data.map((c) => {
    return {
      params: {
        catId: `${c.attributes.name}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(
    ` http://localhost:1337/api/articles?filters[category][name][$eq]=${params.catId}&populate[0]=category`
  );
  const strapi = await res.json();

  return {
    props: {
      posts: strapi.data,
    },
    revalidate: 60,
  };
}
