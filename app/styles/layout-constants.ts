// Layout constants for consistent sizing across the application
export const LAYOUT_CONSTANTS = {
  SIDEBAR_WIDTH: 300,
  MOBILE_BREAKPOINT: 768,
} as const;

// Helper to get sidebar width with unit
export const getSidebarWidth = () => `${LAYOUT_CONSTANTS.SIDEBAR_WIDTH}px`;

