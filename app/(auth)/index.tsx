import React from "react";
import * as Haptics from "expo-haptics";
import { Href, useRouter } from "expo-router";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useSignIn } from "@clerk/clerk-expo";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    if (process.env.EXPO_OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsSigningIn(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        console.error("SignInAttempt", JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  }, [isLoaded, emailAddress, password]);

  const onNavigatePress = React.useCallback(
    async (path: Href) => {
      if (process.env.EXPO_OS === "ios") {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      router.push(path);
    },
    [router]
  );

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        label="Email"
        keyboardType="email-address"
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        label="Password"
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        onPress={onSignInPress}
        loading={isSigningIn}
        disabled={!emailAddress || !password || isSigningIn}
      >
        Sign in
      </Button>

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Don't have an account?</ThemedText>
        <Button onPress={() => onNavigatePress("/sign-up")} variant="ghost">
          Sign up
        </Button>
      </View>

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Forgot password?</ThemedText>
        <Button
          onPress={() => onNavigatePress("/reset-password")}
          variant="ghost"
        >
          Reset password
        </Button>
      </View>
    </BodyScrollView>
  );
}
