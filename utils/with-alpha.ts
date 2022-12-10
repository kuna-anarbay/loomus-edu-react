export default function withAlpha(color: string, opacity: number): string {
    if (opacity === 0) return "transparent";
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);

    return color + _opacity.toString(16).toUpperCase();
}