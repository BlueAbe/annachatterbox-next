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

  // GENERATE FLAGS AFTER PAGE LOAD - FROM HEROKU
  // useEffect(async function () {
  //   const res = await fetch(
  //     " https://annachatterbox.herokuapp.com/api/flags?populate=*"
  //   );
  //   const strapi = await res.json();
  //   const flagObjectsTab = strapi.data[0].attributes.pictures.data;
  //   const flagUrlsTab = flagObjectsTab.map((el) => {
  //     return el.attributes.url;
  //   });
  //   const randomFlagsTab = shuffle(flagUrlsTab);
  //   let viewportWidth = window.innerWidth;
  //   const changeFlagsDetails1 = (i) => {
  //     const l = randomFlagsTab.length;
  //     const restFlagsTable = randomFlagsTab.slice(0, l - i);
  //     const sliceRandomFlagsTab = randomFlagsTab.slice(-i);
  //     setFlags(sliceRandomFlagsTab);
  //     setRestFlags(restFlagsTable);
  //   };
  //   if (viewportWidth > 900) {
  //     changeFlagsDetails1(50);
  //   }
  //   if (viewportWidth <= 900 && viewportWidth > 600) {
  //     changeFlagsDetails1(40);
  //   }
  //   if (viewportWidth <= 600) {
  //     changeFlagsDetails1(25);
  //   }
  // }, []);

  // GENERATE FLAGS AFTER PAGE LOAD - FROM FILES
  useEffect(async function () {
    const propsFlags = [
      "tn_ac-flag.gif",
      "tn_as-flag.gif",
      "tn_bb-flag.gif",
      "tn_bc-flag.gif",
      "tn_bf-flag.gif",
      "tn_bh-flag.gif",
      "tn_bp-flag.gif",
      "tn_bx-flag.gif",
      "tn_by-flag.gif",
      "tn_ca-flag.gif",
      "tn_cm-flag.gif",
      "tn_do-flag.gif",
      "tn_ei-flag.gif",
      "tn_fj-flag.gif",
      "tn_fm-flag.gif",
      "tn_ga-flag.gif",
      "tn_gh-flag.gif",
      "tn_gj-flag.gif",
      "tn_gv-flag.gif",
      "tn_in-flag.gif",
      "tn_jm-flag.gif",
      "tn_ke-flag.gif",
      "tn_kr-flag.gif",
      "tn_li-flag.gif",
      "tn_lt-flag.gif",
      "tn_mi-flag.gif",
      "tn_mr-flag.gif",
      "tn_mt-flag.gif",
      "tn_nh-flag.gif",
      "tn_ni-flag.gif",
      "tn_nr-flag.gif",
      "tn_nz-flag.gif",
      "tn_od-flag.gif",
      "tn_pk-flag.gif",
      "tn_pp-flag.gif",
      "tn_ps-flag.gif",
      "tn_rm-flag.gif",
      "tn_rp-flag.gif",
      "tn_rw-flag.gif",
      "tn_sc-flag.gif",
      "tn_se-flag.gif",
      "tn_sf-flag.gif",
      "tn_sl-flag.gif",
      "tn_sn-flag.gif",
      "tn_st-flag.gif",
      "tn_su-flag.gif",
      "tn_td-flag.gif",
      "tn_tn-flag.gif",
      "tn_tv-flag.gif",
      "tn_tz-flag.gif",
      "tn_ug-flag.gif",
      "tn_uk-flag.gif",
      "tn_us-flag.gif",
      "tn_wa-flag.gif",
      "tn_ws-flag.gif",
      "tn_wz-flag.gif",
      "tn_za-flag.gif",
      "tn_zi-flag.gif",
    ];
    const flagUrlsTab = propsFlags.map((el) => {
      return `/flags/${el}`;
    });
    // console.log(flagUrlsTab);
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
      // console.log("ok");
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
              src={el}
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
