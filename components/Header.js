import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Header() {
  // STATE
  const [flags, setFlags] = useState([]);
  const [restFlags, setRestFlags] = useState([]);
  const router = useRouter();

  // HELPER FUN TO MIX ELEMENTS IN ARRAY
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // GENERATE FLAGS AFTER PAGE LOAD
  useEffect(async function () {
    const res = await fetch(
      " https://annachatterbox.herokuapp.com/api/flags?populate=*"
    );
    const strapi = await res.json();
    const flagObjectsTab = strapi.data[0].attributes.pictures.data;
    const flagUrlsTab = flagObjectsTab.map((el) => {
      return el.attributes.url;
    });
    const randomFlagsTab = shuffle(flagUrlsTab);

    let viewportWidth = window.innerWidth;
    const changeFlagsDetails1 = (i) => {
      const l = randomFlagsTab.length;
      const restFlagsTable = randomFlagsTab.slice(0, l - i);
      const sliceRandomFlagsTab = randomFlagsTab.slice(-i);
      setFlags(sliceRandomFlagsTab);
      setRestFlags(restFlagsTable);
    };
    if (viewportWidth > 900) {
      changeFlagsDetails1(50);
    }
    if (viewportWidth <= 900 && viewportWidth > 600) {
      changeFlagsDetails1(40);
    }
    if (viewportWidth <= 600) {
      changeFlagsDetails1(25);
    }
  }, []);

  // CHANGE FLAGS AFTER CLICK
  const changeFlagsDetails2 = (i) => {
    const concatFlags = [...flags, ...restFlags];
    const l = concatFlags.length;
    const shuffleFlags = shuffle(concatFlags);
    const restFlagsTable = shuffleFlags.slice(0, l - i);
    const flags2 = shuffleFlags.slice(-i);
    setFlags(flags2);
    setRestFlags(restFlagsTable);
  };
  const changeFlags = (e) => {
    let viewportWidth = window.innerWidth;
    if (e.target.className === "header__text") {
      console.log("ok");
      router.push("/", undefined, { shallow: true });
      return 0;
    }
    if (viewportWidth > 900) {
      changeFlagsDetails2(50);
    }
    if (viewportWidth <= 900 && viewportWidth > 600) {
      changeFlagsDetails2(40);
    }
    if (viewportWidth <= 600) {
      changeFlagsDetails2(25);
    }
  };
  //RENDER COMPONENT
  return (
    <div className="header" onClick={changeFlags}>
      <div className="shadow shadow--1"></div>
      <div className="shadow shadow--2"></div>
      <h1 className="header__text">Anna Chatterbox</h1>
      {flags.map((el, index) => {
        return (
          <div className="image image--l" key={index}>
            {" "}
            <Image
              className="image"
              src={`https://annachatterbox.herokuapp.com${el}`}
              alt="Picture of the author"
              width={120}
              height={60}
            />
          </div>
        );
      })}
    </div>
  );
}
