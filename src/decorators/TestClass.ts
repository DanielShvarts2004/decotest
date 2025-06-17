import 'reflect-metadata';
import { describe, test, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { getMetadata } from '../core/metadata';
import { setupHooks } from '../core/hooks';
import { setUpOnlyTests, setUpSkippedTests, setUpTests } from '../core/tests';

export function TestClass(Target: new () => Object) {
    describe(Target.name, () => {
        const instance = new Target();
        const ctor: any = Target;

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

        setupHooks(instance, {
            beforeAlls,
            beforeEachs,
            afterEachs,
            afterAlls,
        });

        setUpSkippedTests(instance, skips);

        setUpOnlyTests(instance, onlys);

        setUpTests(instance, filteredTests);
    });
}
