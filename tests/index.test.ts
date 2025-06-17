import { Skip, Test, TestClass } from "../src";
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
}