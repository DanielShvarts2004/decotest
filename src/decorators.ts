export const TESTS_KEY = Symbol('tests');
export const BEFORE_EACH_KEY = Symbol('beforeEach');
export const AFTER_EACH_KEY = Symbol('afterEach');

function addMeta(target: any, key: string, sym: symbol) {
  const ctor = target.constructor as any;
  if (!ctor[sym]) ctor[sym] = [];
  ctor[sym].push(key);
}

export function Test(target: any, key: string) {
  addMeta(target, key, TESTS_KEY);
}

export function BeforeEach(target: any, key: string) {
  addMeta(target, key, BEFORE_EACH_KEY);
}

export function AfterEach(target: any, key: string) {
  addMeta(target, key, AFTER_EACH_KEY);
}