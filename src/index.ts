import http, { IncomingMessage, ServerResponse } from 'http'
import * as fs from 'fs'

const port = 8888

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const path = req.url
    console.log(path)

    fs.readFile('./statics' + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.write('500 Server Error.')
            res.end()
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
            res.end()
        }
    })
})

server.listen(port)
console.log(`Server has started (PORT:${port.toString()}).`)