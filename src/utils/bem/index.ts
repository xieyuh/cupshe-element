import { BEM, createBEM } from './bem';

export function createNamespace(name: string): [string, BEM] {
  const prefixedName = `c-${name}`;

  return [prefixedName, createBEM(prefixedName)];
}
