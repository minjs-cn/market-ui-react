import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../routes'

const Index: React.FC = () => {
  return (
    <div>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link to={route.path}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Index
