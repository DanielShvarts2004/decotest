import { Test } from "../src";
import { TestClass } from "../src/TestClass";
import { BaseTest } from "./base";

@TestClass
export class MyTest2 extends BaseTest{

    @Test
    test2() {
        console.log('test 2')
    }
}