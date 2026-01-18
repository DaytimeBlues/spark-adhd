export const colors = {
    // Reference: Very deep midnight palette
    background: "#0F111A",
    surface: "#161925",
    surfaceHighlight: "#1C2030",

    // Electric Accents
    accent: "#7C3AED",     // Vibrant Purple
    danger: "#EF4444",
    success: "#10B981",

    // Text
    text: "#FFFFFF",
    textMuted: "#94A3B8",  // Slate 400
    textFaint: "#475569",  // Slate 600
    border: "rgba(255, 255, 255, 0.05)",

    // Mode Palette (restored with deeper tones)
    palette: {
        ignite: "#F87171",    // Soft Red
        fogcutter: "#2DD4BF", // Teal
        pomodoro: "#FB923C",  // Orange
        anchor: "#38BDF8",    // Blue
        checkin: "#A78BFA",   // Lavender
        crisis: "#F43F5E",    // Rose
    },
} as const;

export const spacing = {
    4: 4,
    8: 8,
    12: 12,
    16: 16,
    24: 24,
    32: 32,
    48: 48,
} as const;

export const radius = {
    input: 12,
    button: 14,
    card: 20, // Increased for that premium feel
    pill: 9999,
} as const;
