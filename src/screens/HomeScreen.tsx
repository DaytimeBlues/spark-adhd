import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../components/ui/Screen";
import AppText from "../components/ui/AppText";
import HeroStreak from "../components/ui/HeroStreak";
import ModeGrid from "../components/ui/ModeGrid";
import { spacing } from "../theme";

const HomeScreen = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    try {
      const storedStreak = await AsyncStorage.getItem("streakCount");
      if (storedStreak) setStreak(parseInt(storedStreak, 10));
    } catch (e) {
      console.error("Failed to load streak", e);
    }
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <AppText variant="screenTitle">Spark</AppText>
          <AppText variant="screenSubtitle">Your focus companion</AppText>
        </View>

        <HeroStreak streak={streak} />

        <View style={styles.sectionHeader}>
          <AppText variant="sectionTitle">Modes</AppText>
        </View>

        <ModeGrid />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing[32],
  },
  header: {
    marginBottom: spacing[24],
    marginTop: spacing[16],
  },
  sectionHeader: {
    marginBottom: spacing[16],
    marginTop: spacing[8],
  },
});

export default HomeScreen;
