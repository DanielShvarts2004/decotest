import { test } from "vitest";

export const setUpSkippedTests = <T>(instance: T, skippedTests: Set<string>) => {
    for (const testName of skippedTests) {
        test.skip(testName, async () => {
            await instance[testName]();
        });
    }
}

export const setUpOnlyTests = <T>(instance: T, onlyTests: Set<string>) => {
    for (const testName of onlyTests) {
        test.only(testName, async () => {
            await instance[testName]();
        });
    }
}

export const setUpTests = <T>(instance: T, tests: Set<string>) => {
    for (const testName of tests) {
        test(testName, async () => {
            await instance[testName]();
        });
    }
}