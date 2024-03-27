import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Spacer from "@/components/spacer";
import NewsItem from "@/components/news-item";
import { getNews } from "@/api/news-api";
import useSWR from "swr";
import dayjs from "dayjs";
import AppText from "@/components/app-text";

export default function App() {
  const [pageIndex, setPageIndex] = useState(1);
  const now = dayjs();
  const weekAgo = now.subtract(7, "day");
  const { data, error, isLoading } = useSWR(`/api/news?page=${pageIndex}`, () =>
    getNews({ from: weekAgo.format("YYYY-MM-DD") })
  );
  const filteredData = data?.filter(
    (item) => item.title !== "[Removed]" && item.description !== "[Removed]"
  );
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {!!error && <AppText>Something went wront try later</AppText>}
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && !error ? (
          <FlatList
            data={filteredData}
            ListEmptyComponent={() => <AppText>No Data</AppText>}
            style={styles.list}
            contentContainerStyle={styles.listContentContainer}
            renderItem={({ item }) => <NewsItem item={item} />}
            ItemSeparatorComponent={() => Spacer({ height: 20 })}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    paddingHorizontal: 16,
  },
  listContentContainer: {
    paddingVertical: 20,
  },
});
