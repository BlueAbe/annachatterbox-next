import { extract } from "oembed-parser";

export default async function ombedParser(string) {
  const words = string.match(/<mark [^>]+>(.*?)<\/mark>/g);
  const buttons = [];
  for (const word of words) {
    let color = word.match(/-(.*?)">/g)[0].slice(1, -2);
    let engWord = word.match(/">(.*?)\|/g)[0].slice(2, -2);
    let plWord = word.match(/\|(.*?)<\//g)[0].slice(2, -2);
    buttons[
      words.indexOf(word)
    ] = `<span class="translate-btn translate-btn--${color}" data-front="${engWord}" data-back="${plWord}">${plWord}</span>`;
  }
  for (const word of words) {
    string = string.replace(word, buttons[words.indexOf(word)]);
  }
  return string;
}
