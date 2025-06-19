import { beforeEach, afterEach, beforeAll, afterAll } from "vitest";

type Hooks = {
    beforeAlls: string[],
    beforeEachs: string[],
    afterEachs: string[],
    afterAlls: string[],
};

export const setupHooks = async <T>(instance: T, hooks: Hooks) => {
    const {
        beforeAlls, beforeEachs, afterEachs, afterAlls
    } = hooks;

    if (beforeEachs.length)
        beforeEach(async () => beforeEachs.forEach(async (m) => await instance[m]()));
    if (afterEachs.length)
        afterEach(async () => afterEachs.forEach(async (m) => await instance[m]()));
    if (beforeAlls.length)
        beforeAll(async () => beforeAlls.forEach(async (m) => await instance[m]()));
    if (afterAlls.length)
        afterAll(async () => afterAlls.forEach(async (m) => await instance[m]()));
}
