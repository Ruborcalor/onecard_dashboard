import React, { useContext } from 'react'
import ComplexTable from 'components/ComplexTable'
import { UserContext } from 'contexts/UserContext'

const columns = [
  {
    key: 'datetime',
    numeric: false,
    disablePadding: false,
    label: 'Datetime',
  },
  //   {
  //     key: 'transactionId',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Transaction ID',
  //   },
  { key: 'amount', numeric: true, disablePadding: false, label: 'Price' },
  //   { key: 'location', numeric: true, disablePadding: false, label: 'Location' },
  { key: 'device', numeric: true, disablePadding: false, label: 'Device' },
  { key: 'account', numeric: true, disablePadding: false, label: 'Account' },
]

const formatTime = s => {
  const dtFormat = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  return dtFormat.format(new Date(s * 1e3))
}

export const Transactions = () => {
  const { user, setUser } = useContext(UserContext)
  // @ts-ignore
  //   const rows = user.map((row: any[]) => createData(...row))
  const rows = user['user_transactions']
  console.log(rows)
  return (
    <div>
      <ComplexTable
        rows={rows}
        columns={columns}
        tableName="Your Transactions"
        customRenders={(row, key) => {
          let res = row[key]
          if (key == 'datetime') {
            res = formatTime(res)
          }
          return res
        }}
      />
    </div>
  )
}

export default Transactions
