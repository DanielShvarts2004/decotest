import { Test } from "../src/decorators";
import { TestClass } from "../src/TestClass";

@TestClass
export class MyTest{

    @Test
    test1() {
        console.log('do something')
    }
}