import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import axios from 'services/api'
import { useHistory } from 'react-router'
import { UserContext } from 'contexts/UserContext'

function Logout() {
  // need to call logout at api
  // then redirect to home

  const history = useHistory()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    setUser(null)
    history.push('/')
  })

  return <p>Logging out</p>
}

export default Logout
