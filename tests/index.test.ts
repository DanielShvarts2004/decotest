import { Test } from "../src/decorators";
import { TestClass } from "../src/TestClass";
import { BaseTest } from "./base";

@TestClass
export class MyTest extends BaseTest {

    @Test
    test1() {
        console.log('do something')
    }

    @Test
    test3() {
        console.log('do something 2')
    }
}