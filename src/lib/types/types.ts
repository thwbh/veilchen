export interface KeyValuePair {
  key: unknown;
  value: unknown;
}

export interface ListPickerLabel {
  text: string;
  className?: string;
  activeClassName?: string;
}

export interface ListPickerData {
  value: unknown;
  header: string;
  label?: ListPickerLabel;
  description: string;
}
