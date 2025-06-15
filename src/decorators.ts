import 'reflect-metadata';

const TESTS_KEY = Symbol('tests')
const BEFORE_EACH_KEY = Symbol('beforeEach')
const AFTER_EACH_KEY = Symbol('afterEach')

export function Test(name?: string) {
  return function (target: any, propertyKey: string) {
    if (!Reflect.hasMetadata(TESTS_KEY, target)) {
      Reflect.defineMetadata(TESTS_KEY, [], target)
    }
    const tests = Reflect.getMetadata(TESTS_KEY, target)
    tests.push({ method: propertyKey, name: name ?? propertyKey })
  }
}

export function BeforeEach() {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(BEFORE_EACH_KEY, propertyKey, target)
  }
}

export function AfterEach() {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(AFTER_EACH_KEY, propertyKey, target)
  }
}

export function getTestMetadata(instance: any) {
  const proto = Object.getPrototypeOf(instance)
  return {
    tests: Reflect.getMetadata(TESTS_KEY, proto) || [],
    beforeEach: Reflect.getMetadata(BEFORE_EACH_KEY, proto),
    afterEach: Reflect.getMetadata(AFTER_EACH_KEY, proto),
  }
}