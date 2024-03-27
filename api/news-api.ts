import { NewsResponse } from "@/types/news";
import axios from "axios";
import dayjs from "dayjs";

const newsApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_NEWS_API_URL,
});

interface GetNewsParams {
  pageSize?: number;
  page?: number;
  from?: string;
  q?: string;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
}

export const getNews = async (config?: GetNewsParams) => {
  const now = dayjs();
  const {
    pageSize = 10,
    page = 1,
    sortBy = "popularity",
    from = now.format("YYYY-MM-DD"),
    q = "bitcoin",
  } = config || {};
  const { data } = await newsApi.get<NewsResponse>("/everything", {
    params: {
      q,
      pageSize,
      page,
      sortBy,
      from,
      apiKey: process.env.EXPO_PUBLIC_NEWS_API_KEY,
    },
  });
  return data.articles;
};
