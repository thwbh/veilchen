export class KeyValuePair {
  key: unknown;
  value: unknown;

  constructor(key: unknown, value: unknown) {
    this.key = key;
    this.value = value;
  }
}

export interface ListPickerLabel {
  text: string;
  className?: string;
}

export interface ListPickerData {
  value: unknown;
  header: string;
  label?: ListPickerLabel;
  description: string;
}
