import { test } from "vitest";

export const setUpSkippedTests = (instance: Object, skippedTests: string[]) => {
    for (const testName of skippedTests) {
        test.skip(testName, () => {
            instance[testName]();
        });
    }
}

export const setUpOnlyTests = (instance: Object, onlyTests: string[]) => {
    for (const testName of onlyTests) {
        test.only(testName, () => {
            instance[testName]();
        });
    }
}

export const setUpTests = (instance: Object, tests: string[]) => {
    for (const testName of tests) {
        test(testName, () => {
            instance[testName]();
        });
    }
}