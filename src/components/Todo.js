import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import * as M from '../graphql/mutations/todo'
import { Context } from '../context/TodosContext'

export default function({todo}) {

    const { todos, setTodos, setModal, setEditTodo } = useContext(Context)
    const [deleteTodo] = useMutation(M.DELETE_TODO,
        {
            onCompleted(data) {
                setTodos([
                    ...todos.filter(todo => todo.id !== data.deleteTodo.id)
                ])
            }
        })
    
    const [completeTodo] = useMutation(M.COMPLETE_TODO,
        {
            onCompleted(data) {
                const newtodos = todos.map(todo => {
                    if (todo.id === data.completeTodo.id)
                    return {
                        ...todo,
                        isCompleted: !todo.isCompleted
                    }
                    return todo
                })
                setTodos(newtodos)
            }
        })
    
        return (
            <div className='cover'>
                <li onClick={() => completeTodo({variables: { id: todo.id }})}>
                    <i className={todo.isCompleted ? "fas fa-check-circle mi non" : "fas fa-check-circle mi"}></i>
                    <div className={todo.isCompleted ? "title done" : "title"}>{todo.title}</div>
                </li>
                <span 
                    className="close1"
                    onClick={() => {
                        setModal(true)
                        setEditTodo(todo)
                    }}
                >
                    Edit           
                </span>
                <span 
                    className="close"
                    onClick={() => deleteTodo({variables: { id: todo.id }})}
                >
                    &#10799;           
                </span>
            </div>
        )
}