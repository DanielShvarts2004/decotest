import { beforeEach, afterEach, beforeAll, afterAll } from "vitest";

type Hooks = {
    beforeAlls: string[],
    beforeEachs: string[],
    afterEachs: string[],
    afterAlls: string[],
};

export function setupHooks(instance: any, hooks: Hooks) {
    const {
        beforeAlls, beforeEachs, afterEachs, afterAlls
    } = hooks;

    if (beforeEachs.length)
        beforeEach(() => beforeEachs.forEach((m) => instance[m]()));
    if (afterEachs.length)
        afterEach(() => afterEachs.forEach((m) => instance[m]()));
    if (beforeAlls.length)
        beforeAll(() => beforeAlls.forEach((m) => instance[m]()));
    if (afterAlls.length)
        afterAll(() => afterAlls.forEach((m) => instance[m]()));
}
