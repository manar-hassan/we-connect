import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  CheckOutlined,
  FilterListOutlined,
} from '@mui/icons-material';
import { FormControl, IconButton, Menu, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Button } from 'rizzui';

const WeekButton = () => {
  const filter = [
    {
      title: 'Day',
    },
    {
      title: 'Week',
    },
    {
      title: 'Month',
    },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [age, setAge] = React.useState('week');


  const handle = (event) => {
    handleClose();
    if (event.target.tabIndex == 0) {
      setAge('day');
    }
    if (event.target.tabIndex == 1) {
      setAge('week');
    }
    if (event.target.tabIndex == 2) {
      setAge('month');
    }
  };

  return (
    <>
      <Button
        variant="outline"
        color="primary"
        rounded="pill"
        sx={{
          // borderColor: '#E5E7EB',
          // borderRadius: '20px',
          // textTransform: 'capitalize',
          // color: '#424242',
        }}
        onClick={handleClick}
      >
        {age}
        {open ? (
          <ArrowDropUpOutlined sx={{ color: '#bdbdbd' }} />
        ) : (
          <ArrowDropDownOutlined sx={{ color: '#bdbdbd' }} />
        )}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ ml: 1 }}
      >
        {filter.map((item, index) => (
          <MenuItem
            key={index}
            tabIndex={index}
            onClick={handle}
            sx={{
              width: '200px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>

    
    </>
  );
};

export default WeekButton;
