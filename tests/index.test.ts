import { Test } from "../src/decorators";

export class MyTest {
    @Test()
    test1() {
        console.log('do something')
    }
}