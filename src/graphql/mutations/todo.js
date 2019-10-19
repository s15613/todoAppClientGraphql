import { gql } from 'apollo-boost'

export const ADD_TODO = gql`
  mutation addTodoMutation($title: String!) {
    addTodo(title: $title) {
      id
      title
      isCompleted
      createdAt
    }
  }
`
export const DELETE_TODO = gql`
	mutation deleteTodoMutation ($id: ID!) {
		deleteTodo (id: $id) {
			id
		}
	}
`
export const COMPLETE_TODO = gql`
	mutation completeTodoMutation ($id: ID!) {
		completeTodo (id: $id) {
			id
		}
	}
`

export const DELETE_ALL = gql`
	mutation deleteAllTodoMutation {
		deleteAll
	}
`
export const EDIT_TODO = gql`
	mutation editTodoMutation ($id: ID!, $title: String!, $isCompleted: Boolean!) {
		editTodoMutation (id: $id, title: $title, isCompleted: $isCompleted) {
			id
			title
			isCompleted
			createdAt
		}
	}
`