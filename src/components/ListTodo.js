import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as Q from '../graphql/queries/todo'
import Todo from './Todo'
import { Context } from '../context/TodosContext'

export default function() {

    const { todos, setTodos, filter } = useContext(Context)
    const {  name, sort, status } = filter
    
    const filterdTodos = todos.filter(todo => todo.title.toLowerCase().indexOf(name.trim().toLowerCase()) !== -1)
        const sortedByStatus = filterdTodos.filter(todo => {
                                    if (status === 'active') return todo.isCompleted === false
                                    if (status === 'completed') return todo.isCompleted === true
                                    return true
                                })
        switch (sort) {
            case 'oldest':
                sortedByStatus.sort((a,b) => a.createdAt - b.createdAt);
                break;
            case 'az':
                sortedByStatus.sort((a,b) => a.title.localeCompare(b.title));
                break;
            case 'za':
                sortedByStatus.sort((a,b) => b.title.localeCompare(a.title));
                break;
            default:
                sortedByStatus.sort((a,b) => b.createdAt - a.createdAt);
                break;
        }

    const { loading, error } = useQuery(Q.GET_TODOS,
        {
            onCompleted(data) {
                setTodos(data.todos)
            }
        })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error......!</p>

    return (
        <ul>
            {
                sortedByStatus.map(todo => <Todo key={todo.id} todo={todo} />)
            }
        </ul>
    )
}