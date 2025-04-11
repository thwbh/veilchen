export class KeyValuePair {
  key: unknown;
  value: unknown;

  constructor(key: unknown, value: unknown) {
    this.key = key;
    this.value = value;
  }
}

export enum AlertType {
  info = 'info',
  error = 'error',
  warning = 'warning',
  success = 'success'
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
