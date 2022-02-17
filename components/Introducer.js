import React from "react";
import { useState } from "react";
import { useEffect } from "react";
export default function Intoducer({ ptext, etext, pintro, eintro }) {
  const [text, setText] = useState(ptext);
  const [intro, setIntro] = useState(pintro);
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState(null);
  useEffect(() => {
    setAudio(new Audio(intro));
  }, [intro]);
  useEffect(() => {
    const introducerText = document.querySelector(".introducer__text");
    introducerText.innerHTML = text;
  }, [text]);

  const setPolish = () => {
    const pulseShapes = document.querySelectorAll(".introducer__shape-back");
    setText(ptext);
    setIntro(pintro);
    audio.pause();
    setPlay(false);
    pulseShapes[0].classList.remove("introducer__shape-back--1");
    pulseShapes[1].classList.remove("introducer__shape-back--2");
  };
  const setEnglish = () => {
    const pulseShapes = document.querySelectorAll(".introducer__shape-back");
    setText(etext);
    setIntro(eintro);
    audio.pause();
    setPlay(false);
    pulseShapes[0].classList.remove("introducer__shape-back--1");
    pulseShapes[1].classList.remove("introducer__shape-back--2");
  };
  const playIntro = () => {
    const pulseShapes = document.querySelectorAll(".introducer__shape-back");
    if (!play) {
      audio.play();
      setPlay(true);
      pulseShapes[0].classList.add("introducer__shape-back--1");
      pulseShapes[1].classList.add("introducer__shape-back--2");

      return;
    }
    if (play) {
      setPlay(false);
      audio.pause();
      pulseShapes[0].classList.remove("introducer__shape-back--1");
      pulseShapes[1].classList.remove("introducer__shape-back--2");
      return;
    }
  };
  return (
    <div className="introducer">
      <div className="introducer__col introducer__col--1">
        <div className="introducer__wrapper">
          <div className="introducer__shape-around"></div>
          <p className="introducer__text"></p>
          <div className="introducer__buttons">
            {" "}
            <button
              className="introducer__button introducer__button--polish"
              onClick={setPolish}
            ></button>
            <button
              className="introducer__button introducer__button--british"
              onClick={setEnglish}
            ></button>
          </div>
        </div>
      </div>
      <div className="introducer__col introducer__col--2">
        <div className="introducer__wrapper">
          <div className="introducer__shape-wrapper">
            <figure className="introducer__shape" onClick={playIntro}>
              <figcaption className="introducer__caption">Hi!</figcaption>
            </figure>
            <figure className="introducer__shape-back"></figure>
            <figure className="introducer__shape-back"></figure>
          </div>
          <div className="introducer__foto-wrapper">
            {" "}
            <img
              className="introducer__foto"
              src="/ana5.jpg"
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
