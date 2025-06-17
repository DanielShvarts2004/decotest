import { Test, TestClass } from "../src";
import { BaseTest } from "./base";

@TestClass
export class MyTest2 extends BaseTest{

    @Test
    test2() {
        console.log('test 2')
    }
}