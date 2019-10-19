import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import './App.css'

import Header from './components/Header'
import AddTodo from './components/AddTodo'
import ListTodo from './components/ListTodo'
import Footer from './components/Footer'
import Modal from './components/Modal'
import { ContextProvider } from './context/TodosContext'

const client = new ApolloClient({
  uri: 'https://todoappservergraphql.herokuapp.com/graphql',
  request: async operation => {
    const token = await localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
   }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <div className="App">
          <Header />
          <AddTodo />
          <Footer />
          <ListTodo />
          <Modal />
        </div>
      </ContextProvider>
    </ApolloProvider>
  );
}

export default App;
