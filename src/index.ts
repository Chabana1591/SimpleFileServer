import http, {IncomingMessage, ServerResponse} from 'http'
import * as fs from 'fs'

const port = 8888

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const rs = fs.createReadStream('./statics/index.html', {encoding: 'utf-8'})

    // rs.pipe(res)

    rs.on("open", (chunk)=>{
        res.writeHead(200, {'Content-Type':'text/html'})
    })

    rs.on("data", (chunk)=>{
        res.write(chunk)
    })

    rs.on("end", ()=>{
        console.log('file loaded.')
        res.end()
    })

    rs.on("error", (err)=>{
        res.writeHead(500, 'Server Internal Error.', {'Content-Type':'text/plain'})
        console.error(err)
        res.write('500 Server Internal Error.\n')
        res.end()
    })
})

server.listen(port)
console.log(`Server has started (PORT:${port.toString()}).`)