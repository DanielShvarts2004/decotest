import 'reflect-metadata';
import { describe } from 'vitest';
import { getMetadata } from '../core/metadata';
import { setupHooks } from '../core/hooks';
import { setUpOnlyTests, setUpSkippedTests, setUpTests } from '../core/tests';

type Constructor<T> = new () => T;

export const TestClass = <T>(constructor: Constructor<T>) => {
    describe(constructor.name, async () => {
        const instance = new constructor();
        const ctor: any = constructor;

        const {
            tests,
            skips,
            onlys,
            beforeAlls,
            beforeEachs,
            afterEachs,
            afterAlls,
        } = getMetadata(ctor);

        const filteredTests = tests.filter(test => !skips.includes(test) || !onlys.includes(test));

        await setupHooks(instance, {
            beforeAlls,
            beforeEachs,
            afterEachs,
            afterAlls,
        });

        Promise.all([
            setUpSkippedTests(instance, skips),
            setUpOnlyTests(instance, onlys),
            setUpTests(instance, filteredTests)
        ]);
    });
}
