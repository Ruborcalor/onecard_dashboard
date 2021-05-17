import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
// import UserPage from './pages/User'
// import Landing from './pages/Landing'
import Transactions from './pages/Transactions'
import SpendingSummary from './pages/SpendingSummary'
import Dashboard from './pages/Dashboard'
import VerticalNav from 'components/VerticalNav'
// import Profile from './pages/Profile'
import Login from './pages/Login'
import axios from './services/api'
import { UserContext } from './contexts/UserContext'
import Logout from 'pages/Logout'
import { BrowserRouter } from 'react-router-dom'
import fakedata from 'services/fakedata'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Source Sans Pro',
  },
  navButton: {
    textTransform: 'none',
    margin: '0px 10px',
    fontSize: '16px',
    color: 'white',
  },
  logo: {
    height: '30px',
  },
}))

// style={{ backgroundColor: '#20232A' }}

function App() {
  const classes = useStyles()
  const preventDefault = event => event.preventDefault()
  const [user, setUser] = useState(null)

  // const getData = async () => {
  //   const { data } = await axios.get('/me')
  //   console.log(data)
  //   if
  // }

  // useEffect(() => {
  //   axios
  //     .get('/me')
  //     .then(res => {
  //       console.log(res.data)
  //       setUser(res.data)
  //     })
  //     .catch(e => {
  //       // user not signed in
  //       console.log(e)
  //     })
  // }, [])

  // check if user is signed in
  // add the user info to redux?
  // naw just check if they have a session

  if (user == null) {
    return <Login user={user} setUser={setUser} />
  }

  return (
    <div className="{classes.root}">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <VerticalNav>
            <Switch>
              <Route exact path="/transactions" component={Transactions} />
              <Route
                exact
                path="/spending_summary"
                component={SpendingSummary}
              />
              <Route exact path="/dashboard" component={Dashboard} />
              {/* <Route path="/users" component={UserPage} /> */}
              <Route path="/logout" component={Logout} />
              {/* <Route path="/userstats" component={YourUserStats} /> */}
              {/* <Route path="/leaderboard" component={Leaderboard} /> */}
              {/* <Route path="/profile" component={Profile} /> */}
            </Switch>
          </VerticalNav>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
