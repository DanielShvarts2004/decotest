import { Test } from "../src/decorators";
import { TestClass } from "../src/registerTestClass";

@TestClass
export class MyTest{

    @Test
    test1() {
        console.log('do something')
    }
}