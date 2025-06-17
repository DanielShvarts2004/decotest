import { test } from "vitest";

export const setUpSkippedTests = <T>(instance: T, skippedTests: string[]) => {
    for (const testName of skippedTests) {
        test.skip(testName, () => {
            instance[testName]();
        });
    }
}

export const setUpOnlyTests = <T>(instance: T, onlyTests: string[]) => {
    for (const testName of onlyTests) {
        test.only(testName, () => {
            instance[testName]();
        });
    }
}

export const setUpTests = <T>(instance: T, tests: string[]) => {
    for (const testName of tests) {
        test(testName, () => {
            instance[testName]();
        });
    }
}