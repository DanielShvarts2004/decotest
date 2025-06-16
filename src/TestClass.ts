import { describe, test, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { TestSpec } from './TestSpec';
import { AFTER_ALL_KEY, AFTER_EACH_KEY, BEFORE_ALL_KEY, BEFORE_EACH_KEY, TESTS_KEY } from './symbols';

export function TestClass(TestSpec: new () => TestSpec) {
    describe(TestSpec.name, () => {
        const instance = new TestSpec();
        const ctor: any = TestSpec;

        const tests: string[] = ctor[TESTS_KEY] || [];
        const beforeEachs: string[] = ctor[BEFORE_EACH_KEY] || [];
        const afterEachs: string[] = ctor[AFTER_EACH_KEY] || [];
        const beforeAlls: string[] = ctor[BEFORE_ALL_KEY] || [];
        const afterAlls: string[] = ctor[AFTER_ALL_KEY] || [];

        if (beforeEachs.length)
            beforeEach(() => beforeEachs.forEach((m) => instance[m]()));
        if (afterEachs.length)
            afterEach(() => afterEachs.forEach((m) => instance[m]()));
        if (beforeAlls.length)
            beforeAll(() => beforeAlls.forEach((m) => instance[m]()));
        if (afterAlls.length)
            afterAll(() => afterAlls.forEach((m) => instance[m]()));

        for (const testName of tests) {
            test(testName, () => {
                instance[testName]();
            });
        }
    });
}
