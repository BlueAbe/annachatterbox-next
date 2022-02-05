import React from "react";

export default function Post({ post }) {
  return (
    <>
      <h1>{post.attributes.title}</h1>
      <p>{post.attributes.content}</p>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    "http://localhost:1337/api/articles?populate[0]=category"
  );
  const strapi = await res.json();

  const paths = strapi.data.map((p) => {
    return {
      params: {
        catId: `${p.attributes.category.data.attributes.name}`,
        postId: `${p.attributes.slug}`,
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
    `http://localhost:1337/api/articles?filters[slug][$eq]=${params.postId}`
  );
  const strapi = await res.json();
  return {
    props: {
      post: strapi.data[0],
    },
    revalidate: 60,
  };
}
