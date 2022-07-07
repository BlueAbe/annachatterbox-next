export default function translatorParser(string) {
  const words = string.match(/<mark [^>]+>(.*?)<\/mark>/g);
  if (words) {
    const buttons = [];

    for (const word of words) {
      // console.log(word);
      let color = word.match(/-(.*?)">/g)[0].slice(1, -2);
      // console.log(color);
      let engWord = word.match(/>(.*?)\//g)[0].slice(1, -2);
      // console.log(engWord);
      let plWord = word.match(/\/.*/g)[0].slice(2, -7);
      // console.log(plWord);
      buttons[
        words.indexOf(word)
      ] = `<span class="translate-btn translate-btn--${color}" data-front="${engWord}" data-back="${plWord}">${
        engWord.length > plWord.length ? engWord : plWord
      }</span>`;
    }
    for (const word of words) {
      string = string.replace(word, buttons[words.indexOf(word)]);
    }
    return string;
  }
  return string;
}
