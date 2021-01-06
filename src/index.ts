import http, {IncomingMessage, ServerResponse} from 'http'

const port = 8888

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, 'OK', {'Content-Type':'text/plain'})
    res.write('Hello, world!\n')
    res.end()
})

server.listen(port)
console.log(`Server has started (PORT:${port.toString()}).`)