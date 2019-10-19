import React, { useState } from 'react'

export const Context = React.createContext()

export function ContextProvider({children}) {

    const [todos, setTodos] = useState([])

    const [filter, setFilter] = useState({
        name: '',
        sort: 'latest',
        status: 'all'
    })
    const [modal, setModal] = useState(false)

    const [editTodo, setEditTodo] =  useState({
        id: '',
        title: '',
        isCompleted: false
    })

    return (
        <Context.Provider
            value={{
                todos,
                setTodos,
                filter,
                setFilter,
                modal,
                setModal,
                editTodo,
                setEditTodo
            }}
        >
            { children }
        </Context.Provider>
    )
}