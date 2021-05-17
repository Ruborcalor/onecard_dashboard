import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  // palette: {
  //   type: 'dark',
  //   background: {
  //     default: '#161A1E',
  //     paper: '#20232A',
  //   },
  // },
  // palette: {
  //   primary: {
  //     main: '#FF6F61',
  //   },
  //   background: {
  //     default: '#F4F2F2',
  //   },
  // },
  typography: {
    fontFamily: ['"Source Sans Pro"', '"sans-serif"'].join(','),
  },
  shape: {
    borderRadius: 16,
  },
  overrides: {
    MuiPaper: {
      root: {
        'box-shadow':
          '0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.05) !important',
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
