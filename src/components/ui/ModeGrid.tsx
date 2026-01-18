import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScaleButton from "./ScaleButton";
import AppText from "./AppText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing, radius } from "../../theme";
import GlassCard from "./GlassCard";

const ModeGrid = () => {
    const navigation = useNavigation<any>();

    const modes = [
        { id: "Ignite", name: "Ignite", icon: "fire", color: colors.palette.ignite, desc: "5-min focus" },
        { id: "FogCutter", name: "Fog Cutter", icon: "weather-windy", color: colors.palette.fogcutter, desc: "Task breakdown" },
        { id: "Pomodoro", name: "Pomodoro", icon: "timer-outline", color: colors.palette.pomodoro, desc: "Classic timer" },
        { id: "Anchor", name: "Anchor", icon: "anchor", color: colors.palette.anchor, desc: "Breathing" },
        { id: "CheckIn", name: "Check In", icon: "chart-bar", color: colors.palette.checkin, desc: "Mood & energy" },
        { id: "Crisis", name: "Crisis Mode", icon: "alert-circle-outline", color: colors.palette.crisis, desc: "Safety resources" },
    ];

    return (
        <View style={styles.grid}>
            {modes.map((mode) => (
                <View key={mode.id} style={styles.cardWrapper}>
                    <ScaleButton
                        onPress={() => navigation.navigate(mode.id === "Ignite" ? "Focus" : mode.id)}
                        style={styles.cardContainer}
                    >
                        <GlassCard style={styles.card}>
                            <View style={styles.iconContainer}>
                                <Icon name={mode.icon} size={28} color={mode.color} />
                            </View>
                            <AppText variant="body" style={styles.modeName}>{mode.name}</AppText>
                            <AppText variant="smallMuted" style={styles.modeDesc}>{mode.desc}</AppText>
                        </GlassCard>
                    </ScaleButton>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cardWrapper: {
        width: "48%",
        marginBottom: spacing[16],
    },
    cardContainer: {
        width: "100%",
    },
    card: {
        alignItems: "center",
        paddingVertical: spacing[24],
        paddingHorizontal: spacing[12],
        backgroundColor: colors.surface,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing[12],
    },
    modeName: {
        fontWeight: "700",
        marginBottom: 4,
        color: colors.text,
    },
    modeDesc: {
        fontSize: 12,
        textAlign: "center",
        color: colors.textMuted,
    },
});

export default ModeGrid;
