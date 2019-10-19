import React, { useContext, useRef, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import * as M from '../graphql/mutations/todo'
import { Context } from '../context/TodosContext'

export default function() {

    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    },[])
    const { todos, setTodos } = useContext(Context)
    const [addTodo] = useMutation(M.ADD_TODO,
        {
            onCompleted(data) {
                setTodos([
                    data.addTodo,
                    ...todos
                ])
            }
        })

    const  onTextSubmit = (e) => {
        if (e.target.value.trim() !== '') {
            if (e.key === 'Enter') {
                addTodo({variables: { title: e.target.value.trim() }})
                e.target.value = ''
            }
        }
    }

        return (
            <input
                ref={inputRef}
                className="new-todo" 
                placeholder="What needs to be done?" 
                onKeyPress={onTextSubmit}
            />
        )
}