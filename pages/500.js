import React from "react";

export default function InternalError() {
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
    " https://annachatterbox.herokuapp.com/api/categories/"
  );
  const strapi2 = await res2.json();
  return {
    props: {
      categories: strapi2.data,
    },
    revalidate: 60,
  };
}
