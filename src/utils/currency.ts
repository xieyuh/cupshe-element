type Intl = {
  code: string;
  currency: string;
  sign: boolean;
};

const IntlMap: Record<string, Intl> = {
  '1': { code: 'en-US', currency: 'USD', sign: false },
  '2': { code: 'de-DE', currency: 'EUR', sign: false },
  '3': { code: 'de-DE', currency: 'EUR', sign: false },
  '4': { code: 'es-ES', currency: 'EUR', sign: false },
  '6': { code: 'en-GB', currency: 'AUD', sign: true },
  '8': { code: 'en-GB', currency: 'GBP', sign: false },
  '9': { code: 'en-GB', currency: 'CAD', sign: true },
  '14': { code: 'en-GB', currency: 'NZD', sign: true },
};

export function createCurrency(locale: string) {
  return function (val: number | string, digit = 0): string {
    if (!(locale in IntlMap)) {
      return '';
    }

    const intl = IntlMap[locale];

    const text = (+val).toLocaleString(intl.code, {
      style: 'currency',
      currency: intl.currency,
      minimumFractionDigits: digit,
      maximumFractionDigits: digit,
    });

    return intl.sign ? text.replace(/.*(\$|£)/g, intl.currency + ' $1') : text;
  };
}
