export interface SOAPScenario {
  id: string;
  name: string;
  description: string;
  category: ScenarioCategory;
  difficulty: DifficultyLevel;
  requestXml: string;
  responseXml: string;
  errorXml?: string;
  fixedRequestXml?: string;
  explanation?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ScenarioCategory = 
  | 'XML Structure Errors'
  | 'Authentication Issues'
  | 'Certificate Problems'
  | 'Server-side Errors'
  | 'Timeout Issues'
  | 'Payment-specific Errors';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SOAPResponse {
  success: boolean;
  xml: string;
  statusCode?: number;
  error?: string;
  responseTime?: number;
}

export interface EditorState {
  content: string;
  isReadOnly: boolean;
  showResolveButton: boolean;
  hasRun: boolean;
  isResolved: boolean;
}

export interface AppState {
  scenarios: SOAPScenario[];
  selectedScenario: SOAPScenario | null;
  editorState: EditorState;
  response: SOAPResponse | null;
  sidebarCollapsed: boolean;
  rightPanelCollapsed: boolean;
  searchQuery: string;
  selectedCategory: ScenarioCategory | 'All';
  selectedDifficulty: DifficultyLevel | 'All';
}

export interface ScenarioFormData {
  name: string;
  description: string;
  category: ScenarioCategory;
  difficulty: DifficultyLevel;
  requestXml: string;
  responseXml: string;
  errorXml: string;
  fixedRequestXml: string;
  explanation: string;
  tags: string[];
}
