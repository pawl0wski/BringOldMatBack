import * as cheerio from "cheerio";
import { Element as CheerioElement, Cheerio, SelectorType } from "cheerio";

export interface News {
  id: number
  title: string,
  contentShort: string,
  content?: string,
  photoUrl: string,
  date: Date,
}

export async function scrapNews(): Promise<News[]> {
  const data = await fetch("https://www.mat.umk.pl/wiadomosci/", { method: "GET" });
  const $ = cheerio.load(await data.text());

  return $("section.wiadomosc").map((_, element) => {
    return createNewsFromSectionTag($(element));
  }).toArray();
}

export async function fillNewsContent(news: News): Promise<News> {
    const data = await fetch(`https://www.mat.umk.pl/wiadomosci/?id=${news.id}`)
    const $ = cheerio.load(await data.text());

    news.content = $("article").html() ?? "";

    return news;
}

function createNewsFromSectionTag(newsElement: Cheerio<CheerioElement>): News {
  return {
    id: parseInt(newsElement.find("p.wiecej a").attr("href")?.slice(4) ?? ""),
    title: newsElement.children("h3").text(),
    contentShort: newsElement.children("p").html() ?? "",
    date: new Date(newsElement.children("time").text()),
    photoUrl: newsElement.children("img").attr("src") ?? ""
  };
}