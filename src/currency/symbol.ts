export const symbols = {
  USD: '$',
  AUD: '$',
  EUR: '€',
  GBP: '£',
  MXN: '$',
};

export type CurrencySymbol = keyof typeof symbols;

export interface Formatter {
  (value: string | number): string;
}
