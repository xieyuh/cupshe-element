import { createBEM } from './bem';

export function createNamespace(name: string) {
  const prefixedName = `c-${name}`;
  return [prefixedName, createBEM(prefixedName)] as const;
}
