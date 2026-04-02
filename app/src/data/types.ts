export type FieldType = 'text' | 'number' | 'date' | 'datetime' | 'email' | 'select';

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: FieldOption[];
}

export interface EntityConfig {
  key: string;
  title: string;
  description: string;
  endpoint: string;
  fields: FieldConfig[];
}
