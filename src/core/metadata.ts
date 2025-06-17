import { Constructor } from '../types/constructor';
import {
    SKIP_KEY,
    ONLY_KEY,
    TESTS_KEY,
    BEFORE_EACH_KEY,
    AFTER_EACH_KEY,
    BEFORE_ALL_KEY,
    AFTER_ALL_KEY,
} from './keys';

export const getMetadata = <T>(ctor: Constructor<T>) => {
    return {
        skips: Reflect.getMetadata(SKIP_KEY, ctor) || [],
        onlys: Reflect.getMetadata(ONLY_KEY, ctor) || [],
        tests: Reflect.getMetadata(TESTS_KEY, ctor) || [],
        beforeEachs: Reflect.getMetadata(BEFORE_EACH_KEY, ctor) || [],
        afterEachs: Reflect.getMetadata(AFTER_EACH_KEY, ctor) || [],
        beforeAlls: Reflect.getMetadata(BEFORE_ALL_KEY, ctor) || [],
        afterAlls: Reflect.getMetadata(AFTER_ALL_KEY, ctor) || [],
    };
}
