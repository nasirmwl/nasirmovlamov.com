// CRT / Fallout-inspired green phosphor palette.
// Both light and dark themes share the same terminal aesthetic so the look
// stays consistent regardless of the toggle.

// --- CRT phosphor tokens ---
const crt_bg = '#070a08';
const crt_panel = '#0c100d';
const crt_bar_track = '#0f1f14';
const crt_border = '#1a3d28';
const crt_border_medium = '#2a5a3d';
const crt_phosphor = '#6aed9f';
const crt_phosphor_bright = '#b4ffc8';
const crt_phosphor_dim = '#3d8f5c';
const crt_muted = '#7cae8f';
const crt_danger = '#ff6b6b';

// Light Theme Colors (kept on the CRT palette intentionally)
export const bg_primary = crt_bg;
export const bg_secondary = crt_panel;
export const bg_tertiary = crt_bar_track;

export const text_primary = crt_phosphor_bright;
export const text_secondary = crt_phosphor;
export const text_tertiary = crt_muted;
export const text_muted = crt_phosphor_dim;

export const border_light = crt_border;
export const border_medium = crt_border_medium;
export const border_dark = crt_phosphor_dim;

export const accent_primary = crt_phosphor;
export const accent_hover = crt_phosphor_bright;
export const accent_light = crt_phosphor_bright;

export const code_bg = crt_bar_track;
export const code_text = crt_phosphor_bright;
export const code_border = crt_border;

// Dark Theme Colors
export const dark_bg_primary = crt_bg;
export const dark_bg_secondary = crt_panel;
export const dark_bg_tertiary = crt_bar_track;

export const dark_text_primary = crt_phosphor_bright;
export const dark_text_secondary = crt_phosphor;
export const dark_text_tertiary = crt_muted;
export const dark_text_muted = crt_phosphor_dim;

export const dark_border_light = crt_border;
export const dark_border_medium = crt_border_medium;
export const dark_border_dark = crt_phosphor_dim;

export const dark_accent_primary = crt_phosphor;
export const dark_accent_hover = crt_phosphor_bright;
export const dark_accent_light = crt_phosphor_bright;

export const dark_code_bg = crt_bar_track;
export const dark_code_text = crt_phosphor_bright;
export const dark_code_border = crt_border;

// Legacy color aliases (still referenced by some components)
export const black_1 = crt_bg;
export const black_2 = crt_panel;

export const gray_1 = crt_panel;
export const gray_2 = crt_border_medium;
export const gray_3 = crt_phosphor_dim;
export const gray_4 = crt_muted;

export const white_1 = crt_phosphor_bright;
export const white_2 = crt_phosphor;
export const white_3 = crt_muted;

export const pink_1 = crt_phosphor;
export const pink_2 = crt_phosphor_bright;
export const pink_3 = crt_phosphor_dim;

export const blue_1 = crt_phosphor;

export const red_1 = crt_danger;
