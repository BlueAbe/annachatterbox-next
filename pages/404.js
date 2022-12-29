import React from "react";

export default function Notfound() {
  return (
    <main>
      <h2 className="heading-category">
        <span>Nie ma takiej strony</span>
      </h2>
    </main>
  );
}

export async function getStaticProps() {
  const res2 = await fetch(
    `${
      process.env.DEVELOPMENT_BACKEND_HOST
        ? process.env.DEVELOPMENT_BACKEND_HOST
        : process.env.PRODUCTION_BACKEND_HOST
    }/api/categories/`
  );
  const strapi2 = await res2.json();
  return {
    props: {
      categories: strapi2.data,
    },
    revalidate: 60,
  };
}
