import React, { useContext, createContext, useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

const SOCKET_IO_SERVER = "http://localhost:3000"

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(undefined)

    useEffect(() => {
        setSocket(socketIOClient(SOCKET_IO_SERVER))
    }, [])


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;