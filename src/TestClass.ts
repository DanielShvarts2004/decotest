import 'reflect-metadata';
import { describe, test, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { AFTER_ALL_KEY, AFTER_EACH_KEY, BEFORE_ALL_KEY, BEFORE_EACH_KEY, ONLY_KEY, SKIP_KEY, TESTS_KEY } from './symbols';

export function TestClass(Target: new () => Object) {
    describe(Target.name, () => {
        const instance = new Target();
        const ctor: any = Target;

        const skips: string[] = Reflect.getMetadata(SKIP_KEY, ctor) || [];
        const onlys: string[] = Reflect.getMetadata(ONLY_KEY, ctor) || [];
        const tests: string[] = Reflect.getMetadata(TESTS_KEY, ctor) || [];
        const filteredTests = tests.filter(test => !skips.includes(test) || !onlys.includes(test));

        const beforeEachs: string[] = Reflect.getMetadata(BEFORE_EACH_KEY, ctor) || [];
        const afterEachs: string[] = Reflect.getMetadata(AFTER_EACH_KEY, ctor) || [];
        const beforeAlls: string[] = Reflect.getMetadata(BEFORE_ALL_KEY, ctor) || [];
        const afterAlls: string[] = Reflect.getMetadata(AFTER_ALL_KEY, ctor) || [];

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
