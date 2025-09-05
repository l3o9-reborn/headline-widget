export interface HeadlineSettings {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  gradient: boolean;
  gradientDirection: "to-r" | "to-l" | "to-t" | "to-b";
  gradientColors: string[];
  effects: {
    fadeIn: boolean;
    hoverGlow: boolean;
    perLetter: boolean;
  };
 animationType?: "fade" | "hoverGlow" | "perLetter" | "textShadow";
  duration?: number;
  delay?: number;
}
