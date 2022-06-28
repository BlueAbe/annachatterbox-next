export default async function fetchData(link) {
  const res = await fetch(
    `${
      process.env.DEVELOPMENT_BACKEND_HOST
        ? process.env.DEVELOPMENT_BACKEND_HOST
        : process.env.PRODUCTION_BACKEND_HOST
    }${link}`
  );
  return res;
}
