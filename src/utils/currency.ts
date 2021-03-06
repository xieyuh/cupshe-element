type Intl = {
  code: string;
  currency: string;
  sign: boolean;
};

export const IntlMap: Record<string, Intl> = {
  '1': { code: 'en-US', currency: 'USD', sign: false },
  '2': { code: 'de-DE', currency: 'EUR', sign: false },
  '3': { code: 'de-DE', currency: 'EUR', sign: false },
  '4': { code: 'es-ES', currency: 'EUR', sign: false },
  '6': { code: 'en-GB', currency: 'AUD', sign: true },
  '8': { code: 'en-GB', currency: 'GBP', sign: false },
  '9': { code: 'en-GB', currency: 'CAD', sign: true },
  '14': { code: 'en-GB', currency: 'NZD', sign: true },
};

export function useCurrency(locale: string) {
  const intl = locale in IntlMap ? IntlMap[locale] : IntlMap['1'];

  return function (val: number | string): string {
    if (Number.isNaN(+val)) {
      return val as string;
    }

    const text = (+val).toLocaleString(intl.code, {
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currency: intl.currency,
    });

    return intl.sign ? text.replace(/.*(\$|£)/g, intl.currency + ' $1') : text;
  };
}
