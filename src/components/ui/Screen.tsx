import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleProp,
    ViewStyle,
    StyleSheet,
    Platform,
    View,
} from "react-native";
import { colors, spacing } from "../../theme/tokens";

type Props = {
    children: React.ReactNode;
    scroll?: boolean;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Screen wrapper with the "Pro Pivot" design.
 * Features a deep dark background and, on web, a subtle focus vignette.
 */
export default function Screen({ children, scroll, style, contentStyle }: Props) {
    const Container = scroll ? ScrollView : View;

    return (
        <SafeAreaView style={styles.outerContainer}>
            <Container
                style={[styles.innerContainer, style]}
                contentContainerStyle={scroll ? [styles.scrollContent, contentStyle] : undefined}
            >
                {children}
            </Container>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    innerContainer: {
        flex: 1,
        padding: spacing[16],
        ...Platform.select({
            web: {
                // Subtle blue vignette/focus glow centered on screen
                backgroundImage: `radial-gradient(circle at center, ${colors.surfaceHighlight}55 0%, ${colors.background} 80%)`,
                backgroundAttachment: 'fixed',
            } as any,
        }),
    },
    scrollContent: {
        padding: spacing[16],
    },
});
