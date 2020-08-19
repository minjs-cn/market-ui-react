import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import routes from './routes'
import Index from './containers/Index'
import NotFound from './containers/404'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/404" component={NotFound} exact />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} component={route.component} />
        ))}
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}

export default App
