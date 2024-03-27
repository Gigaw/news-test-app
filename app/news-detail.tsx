import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import WebView from "react-native-webview";
import AppText from "@/components/app-text";

export default function NewsDetail() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const [error, setError] = useState(false);

  return (
    <>
      {!error ? (
        <WebView
          style={styles.container}
          onError={() => setError(true)}
          renderError={() => <AppText>Error loading content</AppText>}
          originWhitelist={["*"]}
          source={{ uri: url || "" }}
        />
      ) : (
        <View style={styles.errorContainer}>
          <AppText>Error loading content. Try again later</AppText>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
