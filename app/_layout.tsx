import { Stack } from "expo-router";

export default function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "News" }} />
      <Stack.Screen name="news-detail" options={{ headerTitle: "" }} />
    </Stack>
  );
}
