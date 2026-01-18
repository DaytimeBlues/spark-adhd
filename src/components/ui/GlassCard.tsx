import React from "react";
import { View, StyleSheet, ViewStyle, Platform } from "react-native";
import { colors, radius, spacing } from "../../theme";

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: "default" | "highlight";
}

/**
 * Solid, refined Card.
 * Matches the reference app: deep surface, subtle border, clean shadows.
 */
const GlassCard = ({ children, style, variant = "default" }: GlassCardProps) => {
    return (
        <View
            style={[
                styles.card,
                variant === "highlight" && styles.highlight,
                style
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: radius.card,
        padding: spacing[16],
        overflow: "hidden",
        // Premium subtle shadow
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
            web: {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            } as any,
        }),
    },
    highlight: {
        backgroundColor: colors.surfaceHighlight,
        borderColor: colors.accent,
        borderWidth: 1.5,
    },
});

export default GlassCard;
