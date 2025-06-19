import 'reflect-metadata';
import { describe } from 'vitest';
import { getMetadata } from '../core/metadata';
import { setupHooks } from '../core/hooks';
import { setUpOnlyTests, setUpSkippedTests, setUpTestCases, setUpTests } from '../core/tests';
import { Constructor } from '../types/constructor';
import { testCasesMetadata } from '../types/testCase';

export const TestClass = <T>(constructor: Constructor<T>) => {
    describe(constructor.name, async () => {
        const instance = new constructor();
        const ctor = constructor;

        const {
            tests,
            testCases,
            skips,
            onlys,
            beforeAlls,
            beforeEachs,
            afterEachs,
            afterAlls,
        } = getMetadata(ctor);

        const filteredTests = tests.difference(skips).difference(onlys);
        const filteredTestCases = Object.fromEntries(
            Object.entries(testCases).filter(([key, value]) => !skips.has(key) && !onlys.has(key))
        ) as testCasesMetadata;

        await setupHooks(instance, {
            beforeAlls,
            beforeEachs,
            afterEachs,
            afterAlls,
        });

        Promise.all([
            setUpSkippedTests(instance, skips),
            setUpOnlyTests(instance, onlys),
            setUpTestCases(instance, filteredTestCases),
            setUpTests(instance, filteredTests),
        ]);
    });
}
