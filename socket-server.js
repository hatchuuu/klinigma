import { Server } from 'socket.io'
import dotenv from 'dotenv';

dotenv.config();

const socketPort = Number(process.env.VITE_PORT_SOCKET)
const io = new Server(socketPort, {
    cors: {
        origin: '*'
    }
});

console.log(`Socket.IO server running on port ${socketPort}`);

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);


    socket.on('joinRoom', (polyId) => {
        socket.join(`poly-${polyId}`)
        console.log(`Client ${socket.id} joined room: poly-${polyId}`);
    })

    socket.on('updateQueue', (newQueue) => {
        const { number, polyId } = newQueue
        console.log(`Received number: ${number}, polyId: ${polyId}`);

        try {
            const room = `poly-${polyId}`
            io.to(room).emit('updateQueue', number);
        } catch (error) {
            console.error('Error updating number:', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
