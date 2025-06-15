import { glob } from 'glob'
import path from 'path'
import { pathToFileURL } from 'url'
import { TestSpec } from './TestSpec'

async function run() {
    const files = await glob('tests/**/*.test.ts')

    for (const file of files) {
        const module = await import(pathToFileURL(path.resolve(file)).toString())
        for (const TestClass of Object.values(module)) {
            if (typeof TestClass === 'function') {
                const instance = new TestSpec()
                if (typeof instance.run === 'function') {
                    console.log(`\n▶ Running ${TestClass.name}`)
                    await instance.run()
                }
            }
        }
    }
}

run().catch(console.error)