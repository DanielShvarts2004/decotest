import { Test } from "../src";
import { TestClass } from "../src/registerTestClass";

@TestClass
export class MyTest2{

    @Test
    test2() {
        console.log('test 2')
    }
}