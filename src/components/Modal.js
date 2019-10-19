import React, { useRef, useContext, useEffect } from 'react'
import { Context } from '../context/TodosContext'
import { useMutation } from '@apollo/react-hooks'
import * as M from '../graphql/mutations/todo'

export default function() {
    const { modal, setModal, editTodo, setEditTodo, todos, setTodos } = useContext(Context)
    const { title, isCompleted } = editTodo
    const txt = useRef()
    useEffect(() => {
        modal && txt.current.focus()
    },[modal])

    const [editTodoMutation] = useMutation(M.EDIT_TODO,
        {
            onCompleted(data) {
                const newTodos = todos.map(todo => {
                    if (todo.id === data.editTodoMutation.id)
                    return data.editTodoMutation
                    return todo
                })
                setTodos(newTodos)
            }
        })
    const onHandleChange = ({target}) => {
        const newTodo = {
            ...editTodo,
            title: target.type !== 'checkbox' ? target.value : title,
            isCompleted: target.type === 'checkbox' ? target.checked : isCompleted
        }
        setEditTodo(newTodo)
    }

    return (
        modal && <div className='modal'>
                        <div className="modalcontent">
                            <div className="form23">
                                <input 
                                    ref={txt}
                                    type="text" 
                                    className="form13" 
                                    id="email" 
                                    value={title}
                                    onChange={onHandleChange}
                                />
                            </div>
                            <div className="formcheck">
                                <label>
                                <input 
                                    type="checkbox" 
                                    checked={isCompleted}
                                    onChange={onHandleChange}
                                /> is Completed
                                </label>
                            </div>
                            <button 
                                className="btn1"
                                onClick={() => {
                                    editTodoMutation({variables: editTodo})
                                    setModal(false)
                                }}
                            >Okay</button>
                            <button className="btn2" onClick={() => setModal(false)}>Cancel</button>

                        </div>
                    </div>
        )
}