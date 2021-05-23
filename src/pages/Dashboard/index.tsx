import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import { UserContext } from 'contexts/UserContext'
import SimpleTable from 'components/SimpleTable'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
} from 'recharts'
import { Card, CardContent, CardHeader, FormControl } from '@material-ui/core'
import { keys } from '@material-ui/core/styles/createBreakpoints'

interface ParamTypes {
  userId: string
}

interface TimeStats {
  rank: number
  study_time: number
}

interface Role {
  hours: string
  id: number
  name: string
  mention: string
}

interface UserStats {
  username: string
  stats: {
    pastDay: TimeStats
    pastWeek: TimeStats
    pastMonth: TimeStats
    allTime: TimeStats
    averagePerDay: number
    currentStreak: number
    longestStreak: number
  }
  roleInfo: {
    role: Role
    next_role: Role
    time_to_next_role: number
  }
}

// display all time user studying
// display this month user studying
// display todays user studying
// show line graph with user studying for this week, that can be scopped to other times

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Calculate the sum of an array.
 * @param  {Array} `arr` Array
 * @return {Number} Sum
 */

const useStyles = makeStyles(theme => ({
  paper: {
    //   backgroundColor: '20232a',
    //   color: 'white',
  },
  text: {
    // color: 'white',
  },
  divider: {
    background: '#BEBEBE',
    height: '1px',
  },
  icon: {
    /* fill: 'white', */
  },
  select: {
    '&:before': {
      borderColor: 'white !important',
    },
    '&:after': {
      borderColor: 'white !important',
    },
  },
  chartCard: {
    height: '100px',
    padding: '20px',
    lineHeight: '25px',
  },
  infoCard: {
    height: '213px',
    padding: '16px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '30px',
  },
}))

function Dashboard({ userId }) {
  // userId being viewed
  // const { userId } = useParams<ParamTypes>()
  const classes = useStyles()
  const { user, setUser } = useContext(UserContext)

  const { timeseries_data, user_transactions_summary, account_balances } = user

  const ChartCard = ({ label, value }) => (
    <Box className={classes.chartCard}>
      <Typography variant="body1" gutterBottom={true}>
        <span style={{ fontWeight: 700 }}>{label}</span>
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  )

  //   if (error)
  //     return (
  //       <Container maxWidth="lg" style={{ marginTop: '200px' }}>
  //         <div style={{ width: '60%' }}>
  //           <Typography variant="h1" style={{ fontSize: '140px' }}>
  //             Could not find user.
  //           </Typography>
  //           <Typography variant="h4" style={{ marginTop: '100px' }}>
  //             If you think this is an error, please contact the study together
  //             support team.
  //           </Typography>
  //         </div>
  //       </Container>
  //     )

  const ControlledOpenSelect = ({ onChange, tableName, tableNames }) => {
    const [open, setOpen] = React.useState(false)

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      onChange(event.target.value as string)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const handleOpen = () => {
      setOpen(true)
    }

    return (
      <div style={{ marginLeft: '5px' }}>
        <FormControl>
          {/* <InputLabel id="demo-controlled-open-select-label">
            Time Frame
            </InputLabel> */}
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={tableName}
            onChange={handleChange}
            className={classes.select}
          >
            {tableNames.map(entry => (
              <MenuItem value={entry}>{entry}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }

  const formatTime = s => {
    const dtFormat = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC',
    })

    return dtFormat.format(new Date(s * 1e3))
  }

  const strokeColors = [
    '#332288',
    '#88CCEE',
    '#44AA99',
    '#117733',
    '#999933',
    '#DDCC77',
    '#CC6677',
    '#882255',
    '#AA4499',
  ]

  const [currentPieKey, setCurrentPieKey] = useState(
    Object.keys(user_transactions_summary)[0]
  )

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Card style={{ height: '500px' }}>
          <CardContent>
            <Typography className={classes.cardTitle}>
              Cumulative Spending Graph
            </Typography>
            <div style={{ height: '400px', paddingRight: '20px' }}>
              {timeseries_data && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart>
                    <XAxis
                      // Makes the chart a time series chart
                      dataKey="datetime"
                      tickFormatter={unixTime => formatTime(unixTime)}
                      type="number"
                      domain={['dataMin', 'dataMax']}
                    />
                    <CartesianGrid
                      stroke="#eee"
                      strokeDasharray="5 3"
                      vertical={false}
                    />
                    <Legend />
                    <Tooltip />
                    {/* <XAxis dataKey="date" /> */}
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      dataKey="cumulative_spending"
                    />
                    {Object.keys(timeseries_data).map((key, index) => (
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="cumulative_spending"
                        data={timeseries_data[key]}
                        stroke={strokeColors[index]}
                        strokeWidth={2}
                        dot={false}
                        //   activeDot={{ r: 8 }}
                        key={key}
                        name={key}
                      />
                    ))}

                    {/* <Tooltip
                        content={
                          // @ts-ignore
                          <CustomTooltipContent />
                        }
                        cursor={{ fill: '#E0E0E0' }}
                      /> */}
                    {/* <Bar
                        yAxisId="left"
                        dataKey="study_time"
                        fill="#9656A1"
                        radius={7}
                        barSize={10}
                      /> */}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card style={{ height: '500px' }}>
          <CardContent>
            <Typography className={classes.cardTitle}>
              Spending Location Breakdown
            </Typography>

            <div style={{ height: '380px', paddingRight: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={Object.keys(
                      user_transactions_summary[currentPieKey]
                    ).map((key, index) => ({
                      name: key,
                      ...user_transactions_summary[currentPieKey][key],
                    }))}
                    dataKey="cumulative_spending"
                    nameKey="name"
                  >
                    {Object.keys(user_transactions_summary[currentPieKey]).map(
                      (key, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={strokeColors[index % strokeColors.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ControlledOpenSelect
              onChange={setCurrentPieKey}
              tableName={currentPieKey}
              tableNames={Object.keys(user_transactions_summary)}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={8}>
        <Paper className={classes.infoCard}></Paper>
      </Grid>

      <Grid item xs={4}>
        <div>
          {account_balances && (
            <SimpleTable
              columns={[
                { label: 'Account Name', key: 'account_name' },
                { label: 'Balance', key: 'balance', numeric: true },
              ]}
              data={account_balances}
              height={213}
            />
          )}
        </div>
      </Grid>
    </Grid>
  )
}

export default Dashboard
