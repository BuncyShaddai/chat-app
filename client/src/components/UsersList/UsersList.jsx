import React, { useEffect, useState } from 'react';
import { useUsers } from '../../contexts/UsersProvider'
import User from '../User/User.jsx'
import { useActiveConversation } from '../../contexts/ActiveConversationProvider'
import { useCurrentUser } from '../../contexts/CurrentUserProvider'
import { useSocket } from '../../contexts/SocketProvider'
import { chatAPI } from '../../Apis/chatApi'
import './UsersList.min.css'

const UsersList = () => {
    const [users, setUsers] = useUsers()
    const [currentUser] = useCurrentUser()
    const [activeConversationID, setActiveConversationID] = useActiveConversation()
    const [onlineStatus, setOnlineStatus] = useState({})
    const socket = useSocket()

    // console.log({ users })
    // console.log("rendering USERS_LIST")

    const removeThisUserFromUsersList = (usersList, thisUser) => {
        let newUsersList = usersList.filter(user => user.id !== thisUser.id)
        setUsers(newUsersList)
    }

    const getUsers = async () => {
        try {
            let response = await chatAPI.get('/users')
            let usersList = response.data
            removeThisUserFromUsersList(usersList, currentUser)
        } catch (err) {
            console.log("Errot while getting users..", err)
        }
    }

    useEffect(() => {
        getUsers()
    }, [currentUser])

    useEffect(() => {
        // Setup SocketIO events
        if (socket) {
            socket.on('online-statuses', (onlineStatusesString) => {
                let onlineStatuses = JSON.parse(onlineStatusesString)
                setOnlineStatus(onlineStatuses)
                console.log(`[online-statuses]: ${onlineStatuses}`)
            })
        }

    }, [socket])

    const handleClick = (e) => {
        // console.log("Convo has been clicked", e.target)
        let userID = e.target.dataset.userId
        userID = userID
        // console.log({ userID })
        setActiveConversationID(userID)
    }

    return (
        <div className="users-list">
            {
                (users.length === 0) ? (
                    <LoadingUsers />
                ) : (
                        users.map(user => {
                            return <User
                                user={user}
                                key={user.id}
                                handleClick={handleClick}
                                active={user.id === activeConversationID}
                                online={onlineStatus[user.id]}
                            />
                        })
                    )
            }
        </div>
    );
}

const LoadingUsers = () => {
    return (
        <div className="loading-users"></div>
    )
}

export default UsersList;
