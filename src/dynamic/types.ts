export type ComponentType = "text" | "view" | "button" | "image"

export interface DynamicComponent {
  id: string
  type: ComponentType | string // allow plain string from JSON
  style?: Record<string, any>
  text?: string
  children?: DynamicComponent[]
  navigateTo?: string
  onPress?: string
  source?: any
}

export interface DynamicStructure {
  id: string
  screens?: { id: string; file: string }[]
  components: DynamicComponent[]
}
