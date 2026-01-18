/**
 * HeroStreak.tsx
 * Refined "Pro" version - clean, solid, no bells and whistles.
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../../theme";
import AppText from "./AppText";
import GlassCard from "./GlassCard";

interface HeroStreakProps {
    streak: number;
}

const HeroStreak = ({ streak }: HeroStreakProps) => {
    return (
        <View style={styles.container}>
            <GlassCard style={styles.card}>
                <View style={styles.content}>
                    <View style={styles.streakInfo}>
                        <View style={styles.iconContainer}>
                            <Icon name="fire" size={24} color={colors.palette.ignite} />
                        </View>
                        <View>
                            <AppText variant="sectionTitle" style={styles.streakText}>
                                {streak} day{streak !== 1 ? "s" : ""} streak
                            </AppText>
                            <AppText variant="smallMuted">Consistency is focus.</AppText>
                        </View>
                    </View>
                </View>
            </GlassCard>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing[24],
    },
    card: {
        padding: spacing[16],
        backgroundColor: colors.surfaceHighlight, // Slightly lighter than home surface
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    streakInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing[16],
    },
    streakText: {
        fontSize: 18,
        color: colors.text,
    },
});

export default HeroStreak;
