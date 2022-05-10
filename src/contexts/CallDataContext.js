import React, { useContext, useEffect, useState } from 'react'
import socket from '../helpers/socket';

const CallDataContext = React.createContext();


export default function CallDataProvider({ children }) {
    const [call, setCall] = useState(true);
    const [me, setMe] = useState('');
    const [users, setUsers] = useState('');

    useEffect(() => {
        socket.on('callUser', ({ signal, from }) => {
            setCall({ caller: from, callerSignal: signal })
        })
        socket.on('myID', (id) => {
            setMe(id)
        })
        socket.emit('onl', "hello")
    }, [])

    useEffect(() => {
        if (me) {
            socket.on('onl', (users) => {
                setUsers(users.filter(user => user !== me))
            })
        }
    }, [me])

    return (
        <CallDataContext.Provider value={{ call, setCall, me, users }}>
            {children}
        </CallDataContext.Provider>
    )
}

export function useCallData() {
    return useContext(CallDataContext);
}
