import { BeforeAll, BeforeEach, Test } from "../src";

export class BaseTest {

    @BeforeAll
    setup() {
        console.log('before all')
    }

    @BeforeEach
    setupEach() {
        console.log('before each')
    }

    @Test
    baseTest() {
        console.log('base test')
    }
}