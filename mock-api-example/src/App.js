import React, { useState, useEffect } from 'react'

export const App = () => {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError('Something went wrong!')
      }
    }
    fetchAllUsers()
  }, [])

  return (
    <>
      <h1>List of Users</h1>
      {error && <div>{error}</div>}
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </>
  )
}