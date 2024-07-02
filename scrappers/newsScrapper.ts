import * as cheerio from "cheerio";
import { Element as CheerioElement, Cheerio, SelectorType } from "cheerio";

export interface News {
  id: number
  title: string,
  description: string,
  content?: string,
  photoUrl: string,
  date: Date,
}

export async function scrapNews(): Promise<News[]> {
  const data = await fetch("https://www.mat.umk.pl/wiadomosci/", { method: "GET" });
  const $ = cheerio.load(await data.text());

  const news: News[] = [];

  $("section.wiadomosc").each((_, element) => {
    news.push(createNewsFromSectionTag($(element)));
  });

  return news;
}

function createNewsFromSectionTag(newsElement: Cheerio<CheerioElement>): News {
  return {
    id: parseInt(newsElement.find("p.wiecej a").attr("href")?.slice(4) ?? ""),
    title: newsElement.find("h3").text(),
    description: newsElement.find("p:first-of-type").text(),
    date: new Date(newsElement.find("time").text()),
    photoUrl: newsElement.find("img").attr("src") ?? ""
  };
}