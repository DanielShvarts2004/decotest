import { Constructor } from '../types/constructor';
import { testCasesMetadata } from '../types/testCase';
import {
    SKIP_KEY,
    ONLY_KEY,
    TESTS_KEY,
    BEFORE_EACH_KEY,
    AFTER_EACH_KEY,
    BEFORE_ALL_KEY,
    AFTER_ALL_KEY,
    TEST_CASES_KEY,
} from './keys';

export const getMetadata = <T>(ctor: Constructor<T>) => {
    return {
        skips: new Set<string>(Reflect.getMetadata(SKIP_KEY, ctor) || []),
        onlys: new Set<string>(Reflect.getMetadata(ONLY_KEY, ctor) || []),
        tests: new Set<string>(Reflect.getMetadata(TESTS_KEY, ctor) || []),
        testCases: Reflect.getMetadata(TEST_CASES_KEY, ctor) || {} as testCasesMetadata,
        beforeEachs: Reflect.getMetadata(BEFORE_EACH_KEY, ctor) || [],
        afterEachs: Reflect.getMetadata(AFTER_EACH_KEY, ctor) || [],
        beforeAlls: Reflect.getMetadata(BEFORE_ALL_KEY, ctor) || [],
        afterAlls: Reflect.getMetadata(AFTER_ALL_KEY, ctor) || [],
    };
}
