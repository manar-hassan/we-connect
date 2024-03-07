'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {
  ArrowDropUpOutlined,
  ArrowDropDownOutlined,
  Search,
  SwapVertOutlined,
  AccessTimeOutlined,
  PersonOutlined,
  AllInboxOutlined,
} from '@mui/icons-material';
import { InputBase, Stack } from '@mui/material';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell
          component="th"
          scope="row"
          sx={{ borderRight: '1px solid #e0e0e0' }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
          </IconButton>
          {row.name}
        </TableCell>
        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
          {row.calories}
        </TableCell>
        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
          {row.fat}
        </TableCell>
        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
          {row.carbs}
        </TableCell>
        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
          {row.protein}
        </TableCell>
        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
          {row.fat}
        </TableCell>
        <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
          {row.carbs}
        </TableCell>
        <TableCell align="center">{row.protein}</TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99, 1, 2, 3),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99, 1, 2, 3),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79, 1, 2, 3),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5, 1, 2, 3),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5, 1, 2, 3),
];

const TableContain = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ width: '200px', borderRight: '1px solid #e0e0e0' }}
            >
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Paper
                 elevation={0}
                  component="form"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 150,
                    border:"1px solid #e0e0e0",
                    borderRadius:"12px"
                  }}
                >
                  <InputBase
                    sx={{ flex: 1 }}
                    placeholder="Repudiandae ad culpa"
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                  >
                    <Search />
                  </IconButton>
                </Paper>
                <SwapVertOutlined sx={{ color: '#757575' }} />
              </Stack>
            </TableCell>
            <TableCell
              align="center"
              sx={{ borderRight: '1px solid #e0e0e0', width: '150px' }}
            >
              <Typography variant="body1" color="initial">
                Mon
              </Typography>
              <Stack
                sx={{ flexDirection: 'row', justifyContent: 'center', gap: 1 }}
              >
                <Stack
                  flexDirection={'row'}
                  sx={{ alignItems: 'center', gap: 0.5 }}
                >
                  <AccessTimeOutlined
                    sx={{ color: '#757575', width: '16px' }}
                  />
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontSize: '12px' }}
                  >
                    12:00
                  </Typography>
                </Stack>
                <Stack
                  flexDirection={'row'}
                  sx={{ alignItems: 'center', gap: 0.5 }}
                >
                  <AllInboxOutlined sx={{ color: '#757575', width: '16px' }} />
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontSize: '12px' }}
                  >
                    2
                  </Typography>
                </Stack>
                <Stack
                  flexDirection={'row'}
                  sx={{ alignItems: 'center', gap: 0.5 }}
                >
                  <PersonOutlined sx={{ color: '#757575', width: '16px' }} />
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontSize: '12px' }}
                  >
                    0
                  </Typography>
                </Stack>
              </Stack>
            </TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
              Tue{' '}
            </TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
              Wed
            </TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
              Thu{' '}
            </TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
              Fri{' '}
            </TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
              Sat{' '}
            </TableCell>
            <TableCell align="center">Sun </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContain;
