import { expect } from "vitest";
import { Skip, Test, TestCases, TestClass } from "../src";
import { BaseTest } from "./base";

@TestClass
export class MyTest extends BaseTest {

    @Test
    async test1() {
        console.log('do something')
    }

    @Skip
    @Test
    test3() {
        console.log('do something 2')
    }

    @TestCases<typeof MyTest.prototype.test4>([[1, 2], [2, 3]])
    test4(a: number, b: number) {
        console.log("a: " + a);
        console.log("b: " + b);
        expect(a + 1).toBe(b)
    }
}