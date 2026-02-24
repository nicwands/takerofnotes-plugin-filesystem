import { BaseNotesAdapter } from 'takerofnotes-plugin-sdk'
import matter from 'gray-matter'
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
            if (!file.endsWith('.md')) continue

            const fullPath = path.join(this.notesDir, file)
            const raw = await fs.readFile(fullPath, 'utf8')
            const parsed = matter(raw)

            notes.push({
                ...parsed.data,
                content: parsed.content,
            })
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
        const filePath = path.join(this.notesDir, `${id}.md`)
        await fs.unlink(filePath)
    }

    async _write(note) {
        const filePath = path.join(this.notesDir, `${note.id}.md`)

        const fileContent = matter.stringify(note.content, {
            id: note.id,
            title: note.title,
            category: note.category ?? null,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        })

        await fs.writeFile(filePath, fileContent, 'utf8')
    }
}
