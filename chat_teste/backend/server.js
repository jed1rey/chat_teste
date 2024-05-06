const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()
const server = http.createServer(app.callback())
//funcao que lida com requisicoes

const io = socket(server, {cors: {origin: 'http://localhost:5173'}})

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

io.on('connection', socket => {
    console.log('[IO] nova conexão')
    socket.on('chat.message', data =>{
        console.log('Socket Chat.message =>', data)
        io.emit('chat.message', data)
    })
    socket.on('disconnect', () => {
        console.log('[] desconectado')
    })
})


server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server está rodando na porta http://${SERVER_HOST}: ${SERVER_PORT} `)
    console.log('[HTTP listen => pressione CTRL+C para finalizar ')
})