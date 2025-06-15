export abstract class TestSpec {
    protected assertEqual(actual: any, expected: any) {
        if (actual !== expected) {
            throw new Error(`Assertion failed: expected ${expected}, got ${actual}`);
        }
    }
}