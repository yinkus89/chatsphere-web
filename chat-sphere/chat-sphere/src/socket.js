// src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust the URL according to your backend

export default socket;
