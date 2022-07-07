import React from "react";
export default function Newsletter() {
  //RENDER COMPONENT
  return (
    <div className="newsletter">
      <p>
        Podobają Ci się moje treści? Zapisz się do mojego newslettera i bądź na
        bieżąco !
      </p>
      <form
        className="newsletter__form"
        action="#"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          className="newsletter__input"
          id="name"
          placeholder="First Name"
          required
        ></input>
        <input
          type="email"
          name="email"
          className="newsletter__input"
          id="email"
          placeholder="Email Address"
          required
        ></input>
        <button className="standard-btn standard-btn--newsletter">
          <span className="button__text">Stay updated</span>
        </button>
      </form>
    </div>
  );
}
