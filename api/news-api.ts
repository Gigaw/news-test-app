import axios from "axios";

export const newsApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_NEWS_API_URL,
});
