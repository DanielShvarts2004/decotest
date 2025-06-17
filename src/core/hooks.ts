import { beforeEach, afterEach, beforeAll, afterAll } from "vitest";

type Hooks = {
    beforeAlls: Set<string>,
    beforeEachs: Set<string>,
    afterEachs: Set<string>,
    afterAlls: Set<string>,
};

export const setupHooks = async <T>(instance: T, hooks: Hooks) => {
    const {
        beforeAlls, beforeEachs, afterEachs, afterAlls
    } = hooks;

    if (beforeEachs.size)
        beforeEach(async () => beforeEachs.forEach(async (m) => await instance[m]()));
    if (afterEachs.size)
        afterEach(async () => afterEachs.forEach(async (m) => await instance[m]()));
    if (beforeAlls.size)
        beforeAll(async () => beforeAlls.forEach(async (m) => await instance[m]()));
    if (afterAlls.size)
        afterAll(async () => afterAlls.forEach(async (m) => await instance[m]()));
}
