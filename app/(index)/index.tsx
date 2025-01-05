import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert } from "react-native";

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

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </BodyScrollView>
  );
}
