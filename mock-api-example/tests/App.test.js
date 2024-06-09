import React from 'react'
import { render, screen } from '@testing-library/react'

import { App } from 'src/App.js'

describe('App', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('renders users when API call succeeds', async () => {
    const fakeUsers = [
      { id: 1, name: 'Joe' },
      { id: 2, name: 'Tony' },
    ]
    fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeUsers) })
  
    render(<App />)
  
    expect(screen.getByRole('heading')).toHaveTextContent('List of Users')
  
    expect(await screen.findByText('Joe')).toBeInTheDocument()
    expect(await screen.findByText('Tony')).toBeInTheDocument()
  
    expect(screen.queryByText('No users found')).not.toBeInTheDocument()
  })

  test('renders error when API call fails', async () => {
    fetchMock.mockReject(() => Promise.reject('API error'))
  
    render(<App />)
  
    expect(await screen.findByText('Something went wrong!')).toBeInTheDocument()
    expect(await screen.findByText('No users found')).toBeInTheDocument()
  })
})