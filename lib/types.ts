export type GradientDirection = "to-r" | "to-l" | "to-t" | "to-b";
export type AnimationType = "fade" | "hoverGlow" | "perLetter" | "textShadow";


export interface HeadlineSegmentStyle {
backgroundColor?: string; // chip background
underline?: boolean; // draw underline using text color or gradient
fontWeight?: number; // optional per-segment override (100..900)
}


export interface HeadlineSegment {
text: string;
style?: HeadlineSegmentStyle;
}


export interface HeadlineSettings {
fontFamily: string;
fontSize: number; // px
fontWeight: number; // 100..900 numeric for CSS compatibility
gradient: boolean; // toggle gradient text
gradientDirection: GradientDirection;
gradientColors: [string, string];
animationType?: AnimationType;
duration?: number; // seconds
delay?: number; // seconds
segments?: HeadlineSegment[];
}