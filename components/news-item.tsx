import { View, Image, Button, StyleSheet } from "react-native";
import React from "react";
import { Article } from "@/types/news";
import { Link } from "expo-router";
import AppText from "./app-text";
import Spacer from "./spacer";

interface Props {
  item: Article;
}

export default function NewsItem({ item }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.urlToImage }}
        defaultSource={require("@/assets/default-img.jpg")}
        style={styles.image}
      />
      <Spacer height={7} />
      <AppText fontStyle="h3">{item.title}</AppText>
      <Spacer height={7} />
      <AppText>{item.description}</AppText>
      <Link
        href={{
          pathname: "news-detail",
          params: { url: item.url },
        }}
        asChild
      >
        <Button title="view more" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    borderBottomWidth: 3,
    borderBottomColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
