import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import axios from 'services/api'
import { makeStyles } from '@material-ui/core/styles'
import Particles from 'react-particles-js'
import { SettingsInputAntennaTwoTone } from '@material-ui/icons'
import CircularProgress from '@material-ui/core/CircularProgress'
import GitHubIcon from '@material-ui/icons/GitHub'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link
        color="inherit"
        href="https://github.com/Ruborcalor/onecard_dashboard"
      >
        <GitHubIcon />
        Github Repository
      </Link>{' '}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  loginRoot: {
    height: '100%',
  },
  particles: {
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
  },
  image: {
    backgroundImage: 'url(/mcgillstarry.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignInSide(props) {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { user, setUser } = props

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    console.log('Loading set to true')
    axios
      .post('/get_user_data', {
        email: email,
        password: password,
      })
      .then(data => {
        setUser(data.data)
        setLoading(false)
      })
      .catch(e => {
        console.log('Error')
        setLoading(false)
        setOpen(true)
      })
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <Particles height="100vh" width="100vw" className={classes.particles} />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleClose}
          elevation={6}
          variant="filled"
          severity="error"
        >
          Invalid username or password. Please try again
        </Alert>
      </Snackbar>
      {loading && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="secondary" style={{ zIndex: 20 }} />
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Card
          style={{ height: '600px', width: '60vw', zIndex: 10 }}
          elevation={6}
        >
          <Grid container component="main" className={classes.loginRoot}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Onecard Dashboard Login
                </Typography>
                <Typography component="h3" variant="caption">
                  Enter McGill email credentials to login
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        href="https://www.mcgill.ca/it/stay-safe-online/pw-reset"
                        variant="body2"
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    {/* <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>

                    </Grid> */}
                    <Grid item>
                      <Link href="https://github.com/Ruborcalor/onecard_dashboard">
                        <GitHubIcon style={{ fontSize: '12px' }} />
                        {` Github Repository`}
                      </Link>{' '}
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  )
}
