import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as Print from "expo-print";
import * as ImageManipulator from "expo-image-manipulator";
import { useEffect } from "react";

export default function HomeScreen() {
  const createScoreCard = async () => {
    try {
      const html = `
        <html>
          <head>
            <meta name="color-scheme" content="light">
            <style>
              :root {
                color-scheme: light;
              }
              html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                background-color: 00000;
                color: 00000;
              }
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .score-card {
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                max-width: 600px;
                width: 100%;
              }
              .title {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 20px;
                color: black;
              }
              .score {
                font-size: 72px;
                font-weight: bold;
                margin: 20px 0;
                background: linear-gradient(45deg, #4CAF50, #2196F3);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
              }
              .message {
                font-size: 24px;
                margin-top: 20px;
                color: black;
              }
              .snake-emoji {
                font-size: 48px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="score-card">
              <div class="title">Snaked</div>
              <div class="snake-emoji">🐍</div>
              <div class="score">1</div>
              <div class="message">Can you beat my score?</div>
            </div>
          </body>
        </html>
      `;

      // First create a PDF with specific options for dark mode
      const { uri: pdfUri } = await Print.printToFileAsync({
        html,
        width: 600,
        height: 800,
        base64: false,
        margins: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      });

      // Then convert PDF to PNG with specific options
      const result = await ImageManipulator.manipulateAsync(pdfUri, [], {
        format: ImageManipulator.SaveFormat.PNG,
        compress: 0.7,
        base64: false,
      });

      return result.uri;
    } catch (error: any) {
      console.error(
        "Error creating score card:",
        error,
        error?.message,
        error?.stack
      );
      return null;
    }
  };

  useEffect(() => {
    createScoreCard();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit
          <ThemedText type="defaultSemiBold">
            app/(tabs)/index.tsx
          </ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
