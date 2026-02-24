import path from 'path'
import { app } from 'electron'
import FileSystemAdapter from './FileSystemAdapter'
import { definePlugin } from 'takerofnotes-plugin-sdk'

export default definePlugin({
    id: 'filesystem',
    name: 'Filesystem',
    description: 'Store notes as markdown files on your local filesystem',
    version: '1.0.0',
    apiVersion: '0.1.0',
    configSchema: [
        {
            key: 'notesDir',
            label: 'Notes Directory',
            type: 'directory',
            default: path.join(app.getPath('userData'), 'notes'),
            required: true,
        },
    ],
    createAdapter(config) {
        return new FileSystemAdapter(config)
    },
})
