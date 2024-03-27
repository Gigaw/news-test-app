import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
  RefreshControl,
} from "react-native";
import React from "react";
import Spacer from "@/components/spacer";
import NewsItem from "@/components/news-item";
import AppText from "@/components/app-text";
import useGetNews from "@/hooks/useGetNews";

export default function App() {
  const {
    data: filteredData,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    size,
    setSize,
  } = useGetNews();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {!!error && <AppText>Something went wront try later</AppText>}
        {isLoading && !isLoadingMore && <Text>Loading...</Text>}
        {!isLoading && !error ? (
          <FlatList
            refreshControl={<RefreshControl refreshing={!!isRefreshing} />}
            refreshing={isRefreshing}
            data={filteredData}
            ListEmptyComponent={() => <AppText>No Data</AppText>}
            style={styles.list}
            contentContainerStyle={styles.listContentContainer}
            renderItem={({ item }) => <NewsItem item={item} />}
            ItemSeparatorComponent={() => Spacer({ height: 20 })}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => (
              <>
                <Spacer height={20} />
                {isLoadingMore && (
                  <AppText textAlign="center">Loading More...</AppText>
                )}
                {isReachingEnd && (
                  <AppText textAlign="center">Reached End</AppText>
                )}
                {!isReachingEnd && !isLoadingMore ? (
                  <Button title="Load More" onPress={() => setSize(size + 1)} />
                ) : null}
              </>
            )}
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
