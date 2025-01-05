import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue } from "@/constants/Colors";
import { useClerk } from "@clerk/clerk-expo";
import { router, Stack } from "expo-router";
import { Alert, Pressable } from "react-native";

export default function HomeScreen() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/(auth)");
      Alert.alert("Signed out");
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/list/new")}>
        <IconSymbol name="plus" size={24} color={appleBlue} />
      </Pressable>
    );
  };

  const renderHeaderLeft = () => {
    return (
      <Pressable onPress={() => router.push("/profile")}>
        <IconSymbol name="gear" size={24} color={appleBlue} />
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <Button onPress={handleSignOut}>Sign Out</Button>
      </BodyScrollView>
    </>
  );
}
