import React, { createContext, useContext, useState } from 'react';
// import { useLocalStorage } from '../hooks/useLocalStorage'

const usersContext = createContext()

export const useUsers = () => {
    return useContext(usersContext)
}

// const users = [
//     { id: 1, name: 'Shine' },
//     { id: 2, name: 'Buncy' },
//     { id: 3, name: 'Hanu' },
//     { id: 4, name: 'Duddu' },
//     { id: 5, name: 'Oju' },
//     { id: 6, name: 'Bajji' },
//     { id: 7, name: 'Frienduu' }
// ]

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Shine' },
        { id: 2, name: 'Buncy' },
        { id: 3, name: 'Hanu' },
        { id: 4, name: 'Duddu' },
        { id: 5, name: 'Oju' },
        { id: 6, name: 'Bajji' },
        { id: 7, name: 'Frienduu' },
        { id: 8, name: 'Oju' },
        { id: 9, name: 'Bajji' },
        { id: 10, name: 'Frienduu' },
        { id: 11, name: 'Oju' },
        { id: 12, name: 'Bajji' },
        { id: 13, name: 'Frienduu' },
    ])

    return (
        <usersContext.Provider value={[users, setUsers]}>
            {children}
        </usersContext.Provider>
    );
}

export default UsersProvider;