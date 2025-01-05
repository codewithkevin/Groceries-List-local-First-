import { StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { ThemedText } from "@/components/ThemedText";
import { IconCircle } from "@/components/IconCircle";
import { backgroundColors, emojies } from "@/constants/Colors";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { Href, router } from "expo-router";

const isValidUUID = (id: string | null) => {
  if (!id) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function NewListScreen() {
  const [listId, setListId] = useState("");
  const isValidListId = useMemo(() => isValidUUID(listId), [listId]);

  const randomEmoji = useMemo(
    () => emojies[Math.floor(Math.random() * emojies.length)],
    []
  );

  const randomColor = useMemo(
    () => backgroundColors[Math.floor(Math.random() * emojies.length)],
    []
  );

  const joinShoppingListCallback = (listId: string) => {};

  const handleJoinList = () => {};

  const handleDismissTo = (screen: Href) => {
    if (router.canDismiss()) {
      router.dismiss();
      setTimeout(() => {
        router.push(screen);
      }, 100);
    }
  };

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16, gap: 60 }}>
      <View
        style={{
          alignItems: "center",
          gap: 16,
          marginTop: 16,
        }}
      >
        <IconCircle
          backgroundColor={randomColor}
          emoji={randomEmoji}
          size={64}
          style={{
            marginBottom: 8,
          }}
        />
        <ThemedText type="title">Better Together</ThemedText>
        <ThemedText
          type="defaultSemiBold"
          style={{
            color: "gray",
            textAlign: "center",
          }}
        >
          Create shared shopping list and collaborate in real-time with friends
        </ThemedText>
      </View>

      <View style={{ gap: 30 }}>
        <Button onPress={() => handleDismissTo("/list/new/create")}>
          Create New list
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View style={styles.line} />
          <ThemedText>or join existing</ThemedText>
          <View style={styles.line} />
        </View>
      </View>

      <View style={{ gap: 30 }}>
        <TextInput
          placeholder="Enter a list code"
          value={listId}
          onChangeText={(text) => setListId(text)}
          onSubmitEditing={(e) => {
            joinShoppingListCallback(e.nativeEvent.text);
          }}
          containerStyle={{
            marginBottom: 0,
          }}
        />

        <Button onPress={handleJoinList} disabled={!isValidListId}>
          Join List
        </Button>

        <Button
          variant="ghost"
          onPress={() => handleDismissTo("/list/new/scan")}
        >
          Scan QR code
        </Button>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
});