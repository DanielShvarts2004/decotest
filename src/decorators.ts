import { TESTS_KEY, BEFORE_EACH_KEY, AFTER_EACH_KEY } from "./symbols";

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