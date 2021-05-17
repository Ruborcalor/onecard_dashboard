import React, { useContext } from 'react'
import ComplexTable from 'components/ComplexTable'
import { UserContext } from 'contexts/UserContext'
import SimpleTable from 'components/SimpleTable'
import { Box, FormControl, MenuItem, Select } from '@material-ui/core'

const columns = [
  {
    key: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Location',
  },
  //   {
  //     key: 'transactionId',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Transaction ID',
  //   },
  {
    key: 'cumulative_spending',
    numeric: true,
    disablePadding: false,
    label: 'Total Spending',
  },
  //   { key: 'location', numeric: true, disablePadding: false, label: 'Location' },
  { key: 'count', numeric: true, disablePadding: false, label: 'Count' },
]

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
          variant="outlined"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={tableName}
          onChange={handleChange}
          //   className={classes.select}
        >
          {tableNames.map(entry => (
            <MenuItem value={entry}>{entry}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export const Transactions = () => {
  const { user, setUser } = useContext(UserContext)

  const [tableName, setTableName] = React.useState(
    Object.keys(user['user_transactions_summary'])[0]
  )

  // @ts-ignore
  //   const rows = user.map((row: any[]) => createData(...row))
  return (
    <div>
      <SimpleTable
        tableName={tableName}
        data={Object.keys(user['user_transactions_summary'][tableName]).map(
          (key, index) => ({
            name: key,
            ...user['user_transactions_summary'][tableName][key],
          })
        )}
        columns={columns}
        height={100}
        rowHeight={40}
      />
      <Box marginTop="30px" />

      <ControlledOpenSelect
        onChange={setTableName}
        tableName={tableName}
        tableNames={Object.keys(user['user_transactions_summary'])}
      />
    </div>
  )
}

export default Transactions
