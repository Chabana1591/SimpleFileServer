import http, { IncomingMessage, ServerResponse } from 'http'
import * as fs from 'fs'
import mime from 'mime-types'
import settings from '../settings/setting.json'

const port = 8888

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

    const path: string = toFilePath(req.url)
    console.log(`${req.url}(${path}にフォワード)`)

    fs.readFile(settings.webContentDir + path, (err, data) => {
        if (err) {
            console.log(err)
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.write('500 Server Error.')
            res.end()
        } else {
            const mimeType: string = toMimeStr(mime.lookup(path))
            console.log('mimType: ' + mimeType)
            res.writeHead(200, { 'Content-Type': mimeType })
            res.write(data)
            res.end()
        }
    })
})

server.listen(port)
console.log(`Server has started (PORT:${port.toString()}).`)
console.log(`WebContent: ${settings.webContentDir}`)

function toFilePath(url: string | undefined): string {
    if (typeof url === 'undefined') {
        return ''
    }
    if (url.match(/^\/+$/)) {
        return '/index.html'
    }
    return url.normalize().replace(/^(\.\.(\/|\\|$))+/, '')
}

function toMimeStr(mimeType: string | false): string {
    if (typeof mimeType === 'boolean') {
        return 'text/plain'
    }
    return mimeType
}