'use client';
import React from 'react';
import Box from '@mui/material/Box';
import OptionButton from './Buttons/optionButton';
import WeekButton from './Buttons/weekButton';
import ActionButton from './Buttons/actionButton';


import {
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  ArrowDropUpOutlined,
  ArrowDropDownOutlined,
  FilterListOutlined,
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  TodayOutlined,
} from '@mui/icons-material';

const TableButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        mx: 2,
        textTransform: 'lowercase',
        mb: 3,
      }}
    >
      <Stack sx={{ flexDirection: 'row', gap: 2 }}>
        <OptionButton />

        <IconButton
          aria-label="delete"
          sx={{ border: '1px solid #E5E7EB', color: '#00b0ff' }}
        >
          <FilterListOutlined />
        </IconButton>

        <WeekButton/>
        <Button
          variant="outlined"
          startIcon={
            <ArrowBackIosNewOutlined sx={{ width: '12px', color: '#616161' }} />
          }
          endIcon={
            <ArrowForwardIosOutlined sx={{ width: '12px', color: '#616161' }} />
          }
          sx={{
            borderColor: '#E5E7EB',
            borderRadius: '20px',
            textTransform: 'capitalize',
            color: '#424242',
          }}
        >
          date
        </Button>
        <IconButton
          aria-label="delete"
          sx={{ border: '1px solid #E5E7EB', color: '#00b0ff' }}
        >
          <TodayOutlined />
        </IconButton>
      </Stack>

      <Stack sx={{ flexDirection: 'row', gap: 2 }}>
        {/* <Button
          variant="outlined"
          onClick={() => setOpen(!open)}
          sx={{
            borderColor: '#E5E7EB',
            borderRadius: '20px',
            textTransform: 'capitalize',
            color: '#00b0ff',
          }}
        >
          Actions
          {open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
        </Button> */}
        <ActionButton/>
        <Button
          variant="outlined"
          onClick={() => setOpen(!open)}
          sx={{
            borderColor: '#E5E7EB',
            borderRadius: '20px',
            textTransform: 'capitalize',
            color: '#00b0ff',
          }}
        >
          Add
          {open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
        </Button>
        <Button
          variant="outlined"
          disabled
          sx={{ borderRadius: '20px', textTransform: 'capitalize' }}
        >
          Publish
        </Button>
      </Stack>
    </Stack>
  );
};

export default TableButton;
