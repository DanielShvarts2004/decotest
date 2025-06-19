import { test } from "vitest";
import { testCasesMetadata } from "../types/testCase";

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

export const setUpTestCases = <T>(instance: T, testCases: Set<testCasesMetadata>) => {
    for (const testCase of testCases) {
        for (const [key, value] of Object.entries(testCase))
            test.each(value)(key, async (...args) => {
                await instance[key](...args);
            });
    }
}
