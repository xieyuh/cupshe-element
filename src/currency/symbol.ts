export const symbols = {
  USD: '$',
  AUD: '$',
  EUR: '€',
  GBP: '£',
  MXN: '$',
};

export type Symbol = keyof typeof symbols;

export interface Formatter {
  (value: string | number): string;
}
