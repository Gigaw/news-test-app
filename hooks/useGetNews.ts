import { newsApi } from "@/api/news-api";
import dayjs from "dayjs";
import useSWRInfinite from "swr/infinite";
import { NewsResponse } from "@/types/news";

const PAGE_SIZE = 10;

export default function useGetNews() {
  const now = dayjs();
  const weekAgo = now.subtract(7, "day");
  const { data, error, size, mutate, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (index) =>
        `/everything?from=${weekAgo.format(
          "YYYY-MM-DD"
        )}sortBy=popularity&q=bitcoin&pageSize=${PAGE_SIZE}&page=${
          index + 1
        }&apiKey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}`,
      (url) =>
        newsApi.get<NewsResponse>(url).then((res) => {
          return res.data.articles;
        })
    );

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const flatData = data?.flat();
  const filteredData = flatData?.filter(
    (item) => item.title !== "[Removed]" && item.description !== "[Removed]"
  );

  return {
    data: filteredData,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    size,
    mutate,
    setSize,
  };
}
