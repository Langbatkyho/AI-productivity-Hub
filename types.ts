export enum UserRole {
  PRODUCTION = 'Sản xuất',
  OPS = 'Vận hành/Nhân sự/Admin',
  TECH = 'Kỹ thuật/CNTT'
}

export enum ItemType {
  RECIPE = 'RECIPE',
  BLUEPRINT = 'BLUEPRINT'
}

export interface RecipeInput {
  id: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  icon: string;
  role: UserRole;
  inputs: RecipeInput[];
  systemPrompt: string; // The prompt sent to Gemini
  category: 'Viết' | 'Đọc' | 'Phân tích';
}

export interface Blueprint {
  id: string;
  title: string;
  description: string;
  icon: string;
  role: UserRole;
  guideContent: string; // Detailed text guide instead of video
  toolsInvolved: string[]; // e.g., ["Zapier", "Google Sheets"]
  goldenPrompt: string; // The prompt user copies
  steps: string[]; // High level steps
}

export interface AppState {
  role: UserRole | null;
  completedBlueprints: string[];
  view: 'ONBOARDING' | 'DASHBOARD' | 'LIBRARY' | 'RECIPE_EXECUTION' | 'BLUEPRINT_DETAIL';
  activeRecipeId: string | null;
  activeBlueprintId: string | null;
}