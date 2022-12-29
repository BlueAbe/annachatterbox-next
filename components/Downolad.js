import React from "react";
import { useState } from "react";
export default function Download({ url, filename, link }) {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const download = (url, name) => {
    if (!url) {
      throw new Error("Resource URL not provided! You need to provide one");
    }
    setFetching(true);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style = "display: none";

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => setError(true));
  };

  return (
    <a
      disabled={fetching}
      onClick={() => download(url, filename)}
      className="materials__link"
    >
      {link}
    </a>
  );
}
