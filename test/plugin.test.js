import { describe, it } from 'vitest'
import { runPluginTests } from '@takerofnotes/plugin-sdk'
import plugin from './src/index.js'
import FileSystemAdapter from './src/FileSystemAdapter.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const testDir = path.join(__dirname, 'test-notes')

if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true })
}

const adapter = new FileSystemAdapter({ notesDir: testDir })
const tests = runPluginTests({ plugin, adapter })

describe('Plugin Validation', () => {
    tests.validatePlugin(it, (a, b) => expect(a).toBe(b))
})

describe('Adapter: init()', () => {
    tests.init(it)
})

describe('Adapter: getAll()', () => {
    tests.getAll(it)
})

describe('Adapter: create()', () => {
    tests.create(it)
})

describe('Adapter: update()', () => {
    tests.update(it)
})

describe('Adapter: delete()', () => {
    tests.delete(it)
})

describe('Full CRUD Cycle', () => {
    tests.crudCycle(it)
})
