import React from "react";
import Link from "next/link";
export default function Navigation(props) {
  return (
    <div className="navigation">
      <ul className="navigation__list">
        {props.props.map((el) => {
          return (
            <li className="navigation__item" key={el.id}>
              <Link href={`/${el.attributes.slug}`}>
                <a className="navigation__link">{`${el.attributes.name}`}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
