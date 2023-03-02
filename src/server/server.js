import express from 'express'
import { createServer } from 'http'
import { Server } from "socket.io"
const app = express()
import { dirname, join } from 'path'

const server  = createServer(app)
const io = new Server(server , {
    cors:{
        origin:"*"
    }
})


const _dirname = dirname("")
const buildPath = join(_dirname  , "../../dist");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../../dist/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})




io.on("connection" , (socket) => {
   console.log('We are connected')

   socket.on("chat" , chat => {
      io.emit('chat' , chat)
   } )

   socket.on('disconnect' , ()=> {
    console.log('disconnected')
   })
})



server.listen(5001 , () => console.log('Listening to port 5001'))