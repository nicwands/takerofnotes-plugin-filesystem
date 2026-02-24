import FileSystemAdapter from './FileSystemAdapter'
import { definePlugin } from 'takerofnotes-plugin-sdk'

export default definePlugin({
    id: 'filesystem',
    name: 'Filesystem',
    description: 'Store notes as markdown files on your local filesystem',
    version: '1.6.0',
    apiVersion: '0.4.0',
    configSchema: [
        {
            key: 'notesDir',
            label: 'Notes Directory',
            type: 'directory',
            default: '__DEFAULT_USER_DATA__/notes',
            required: true,
        },
    ],
    createAdapter(config) {
        return new FileSystemAdapter(config)
    },
})
