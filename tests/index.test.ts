import { TestSpec } from "../src";
import { Test } from "../src/decorators";
import { registerTestClass } from "../src/registerTestClass";

@registerTestClass
export class MyTest extends TestSpec {

    @Test
    test1() {
        console.log('do something')
    }
}