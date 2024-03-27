import { View } from "react-native";
import React from "react";

interface Props {
  height?: number;
  width?: number;
}

export default function Spacer({ height, width }: Props) {
  return <View style={{ height, width }} />;
}
