import { gql } from 'apollo-boost'

export const GET_TODOS = gql`
	query getTodos {
		todos {
            id
            title
			isCompleted
			createdAt
		}
	}
`