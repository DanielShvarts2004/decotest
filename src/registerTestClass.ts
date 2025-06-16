import { describe, test, beforeEach, afterEach } from 'vitest';
import { TestSpec } from './TestSpec';
import { AFTER_EACH_KEY, BEFORE_EACH_KEY, TESTS_KEY } from './decorators';

export function TestClass(TestSpec: new () => TestSpec) {
    describe(TestSpec.name, () => {
        const instance = new TestSpec();
        const ctor: any = TestSpec;

        const tests: string[] = ctor[TESTS_KEY] || [];
        const befores: string[] = ctor[BEFORE_EACH_KEY] || [];
        const afters: string[] = ctor[AFTER_EACH_KEY] || [];

        if (befores.length)
            beforeEach(() => befores.forEach((m) => instance[m]()));
        if (afters.length)
            afterEach(() => afters.forEach((m) => instance[m]()));

        for (const testName of tests) {
            test(testName, () => {
                instance[testName]();
            });
        }
    });
}
