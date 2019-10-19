import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as Q from './graphql/queries/example'

export const A = () => {
  const { loading, data } = useQuery(Q.TEST)
  if (loading) return <p>loading ....</p>
  return <p>{data.hello}</p>
}