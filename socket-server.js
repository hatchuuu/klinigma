import axios from 'axios';
import { Server } from 'socket.io'
import dotenv from 'dotenv';

dotenv.config();

// Socket.IO server setup
const socketPort = process.env.VITE_PORT_SOCKET
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

    // Update angka di DB dan broadcast ke user
    socket.on('updateQueue', async (newQueue) => {
        const { number, polyId } = newQueue
        console.log(`Received number: ${number}, polyId: ${polyId}`);

        try {
            // Update angka di JSON Server
            const url = process.env.VITE_API_USERS_URL
            const response = await axios.patch(`${url}/polyclinics/${polyId}`, {
                currentQueue: number
            });

            // Broadcast perubahan angka ke semua client
            const room = `poly-${polyId}`
            io.to(room).emit('updateQueue', response.data.currentQueue);
        } catch (error) {
            console.error('Error updating number:', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
