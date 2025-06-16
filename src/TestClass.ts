import { describe, test, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { TestSpec } from './TestSpec';
import { AFTER_ALL_KEY, AFTER_EACH_KEY, BEFORE_ALL_KEY, BEFORE_EACH_KEY, ONLY_KEY, SKIP_KEY, TESTS_KEY } from './symbols';

export function TestClass(TestSpec: new () => TestSpec) {
    describe(TestSpec.name, () => {
        const instance = new TestSpec();
        const ctor: any = TestSpec;

        const skips: string[] = ctor[SKIP_KEY] || [];
        const onlys: string[] = ctor[ONLY_KEY] || [];
        const tests: string[] = ctor[TESTS_KEY] || [];
        const filteredTests = tests.filter(test => !skips.includes(test) || !onlys.includes(test));

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

        for (const testName of skips) {
            test.skip(testName, () => {
                instance[testName]();
            });
        }

        for (const testName of onlys) {
            test.only(testName, () => {
                instance[testName]();
            });
        }

        for (const testName of filteredTests) {
            test(testName, () => {
                instance[testName]();
            });
        }
    });
}
