import { extract } from "oembed-parser";

export default async function ombedParser(string) {
  const ombedLinks = string.match(/<oembed [^>]+>(.*?)<\/oembed>/g);
  if (ombedLinks) {
    const ombedLinks2 = ombedLinks.map((el) => el.slice(13, -12));
    const iframes = [];
    for (const link of ombedLinks2) {
      const iframe = await extract(link, { maxwidth: 1000, maxheight: 500 });
      iframes.push(iframe.html);
    }
    for (const ombed of ombedLinks) {
      string = string.replace(ombed, iframes[ombedLinks.indexOf(ombed)]);
    }
    return string;
  }
  return string;
}
