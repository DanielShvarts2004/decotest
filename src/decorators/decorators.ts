import 'reflect-metadata';
import { TESTS_KEY, BEFORE_EACH_KEY, AFTER_EACH_KEY, BEFORE_ALL_KEY, AFTER_ALL_KEY, ONLY_KEY, SKIP_KEY, TEST_CASES_KEY } from "../core/keys";

const addMeta = (target: any, key: string, symbol: symbol) => {
  const existingMeta = Reflect.getMetadata(symbol, target.constructor) || [];
  Reflect.defineMetadata(symbol, [...existingMeta, key], target.constructor);
}

export const TestCases = (cases: any[][]) => (target: any, propertyKey: string) => {
  const existingMeta = Reflect.getMetadata(TEST_CASES_KEY, target.constructor) || [];
  Reflect.defineMetadata(TEST_CASES_KEY, { ...existingMeta, [propertyKey]: cases }, target.constructor);
}

export const Test = (target: any, key: string) => {
  addMeta(target, key, TESTS_KEY);
}

export const BeforeEach = (target: any, key: string) => {
  addMeta(target, key, BEFORE_EACH_KEY);
}

export const AfterEach = (target: any, key: string) => {
  addMeta(target, key, AFTER_EACH_KEY);
}

export const BeforeAll = (target: any, key: string) => {
  addMeta(target, key, BEFORE_ALL_KEY);
}

export const AfterAll = (target: any, key: string) => {
  addMeta(target, key, AFTER_ALL_KEY);
}

export const Only = (target: any, key: string) => {
  addMeta(target, key, ONLY_KEY);
}

export const Skip = (target: any, key: string) => {
  addMeta(target, key, SKIP_KEY);
}