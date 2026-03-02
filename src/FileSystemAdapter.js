import { BaseNotesAdapter } from '@takerofnotes/plugin-sdk'
import fs from 'fs/promises'
import path from 'path'

export default class FileSystemAdapter extends BaseNotesAdapter {
    constructor(config) {
        super()

        for (const field in config) {
            this[field] = config[field]
        }
    }

    async init() {
        await fs.mkdir(this.notesDir, { recursive: true })
    }

    async getAll() {
        const files = await fs.readdir(this.notesDir)
        const notes = []

        for (const file of files) {
            if (!file.endsWith('.json')) continue

            const fullPath = path.join(this.notesDir, file)
            const fileContent = await fs.readFile(fullPath, 'utf8')
            const parsedFile = JSON.parse(fileContent)

            notes.push(parsedFile)
        }

        return notes
    }

    async create(note) {
        await this._write(note)
    }

    async update(note) {
        await this._write(note)
    }

    async delete(id) {
        const filePath = path.join(this.notesDir, `${id}.json`)
        await fs.unlink(filePath)
    }

    async _write(note) {
        const filePath = path.join(this.notesDir, `${note.id}.json`)

        const stringifiedNote = JSON.stringify(note)

        await fs.writeFile(filePath, stringifiedNote, 'utf8')
    }
}
