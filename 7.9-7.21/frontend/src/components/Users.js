import React from 'react'
import { useSelector } from 'react-redux'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material'
import {
  Link
} from 'react-router-dom'


const Users = () => {

  const users = useSelector(store => store.users)
  return (
    <div>
      <Typography variant='h4' sx={{ my: 4 }} >Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="button"> <b>Username</b></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button"><b>Blogs created</b></Typography>
              </TableCell>
            </TableRow>
            {users.map (user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users