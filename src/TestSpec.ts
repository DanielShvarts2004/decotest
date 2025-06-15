import { getTestMetadata } from './decorators'

export class TestSpec {
    async run() {
        const metadata = getTestMetadata(this)
        for (const { method, name } of metadata.tests) {
            if (metadata.beforeEach) await this[metadata.beforeEach]()
            await this[method]()
            if (metadata.afterEach) await this[metadata.afterEach]()
            console.log(`✅ ${name}`)
        }
    }
}