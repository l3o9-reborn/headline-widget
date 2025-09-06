export type GradientDirection = "to-r" | "to-l" | "to-t" | "to-b";
export type AnimationType = "fade" | "hoverGlow" | "perLetter" | "textShadow"|"none";


export interface HeadlineSegmentStyle {
backgroundColor?: string; // chip background
underline?: boolean; //  underline using text color or gradient
}


export interface HeadlineSegment {
text: string;
style?: HeadlineSegmentStyle;
}


export interface HeadlineSettings {
fontFamily: string;
fontSize: number; // px
fontWeight: number; // 100..900 
gradient: boolean; // toggle gradient text
gradientDirection: GradientDirection;
gradientColors: [string, string];
animationType?: AnimationType;
duration?: number; // seconds
delay?: number; // seconds
segments?: HeadlineSegment[];
}