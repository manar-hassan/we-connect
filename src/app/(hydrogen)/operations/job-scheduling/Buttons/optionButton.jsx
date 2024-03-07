import React from 'react';
import { Divider, ListSubheader, Menu, MenuItem } from '@mui/material';
import {Button}from "rizzui"
import {
  ArrowDropUpOutlined,
  ArrowDropDownOutlined,
  FormatListBulletedOutlined,
  CheckOutlined,
} from '@mui/icons-material';

const OptionButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSort, setAnchorElSort] = React.useState(null);

  const open = Boolean(anchorEl);
  const openSort = Boolean(anchorElSort);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickSort = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSort = () => {
    setAnchorElSort(null);
  };
  const [check, setCheck] = React.useState('block');
  const [check2, setCheck2] = React.useState('none');
  const [checkSort1, setCheckSort1] = React.useState('block');
  const [checkSort2, setCheckSort2] = React.useState('none');
  const [checkSort3, setCheckSort3] = React.useState('none');

  const handleCheck = (item) => {
    handleClose();
    if (item.target.tabIndex == -1) {
      setCheck2('block');
    } else {
      setCheck2('none');
    }
    if (item.target.tabIndex == 0) {
      setCheck('block');
    } else {
      setCheck('none');
    }
  };
  const checkArr = [
    {
      title: 'view by users',
      icon: <CheckOutlined sx={{ display: check, color: '#00b0ff' }} />,
    },
    {
      title: 'view by jobs',
      icon: <CheckOutlined sx={{ display: check2, color: '#00b0ff' }} />,
    },
  ];
  const handleCheckSort = (item) => {
    handleCloseSort();
    if (item.target.tabIndex == 0) {
      setCheckSort1('block');
    } else {
      setCheckSort1('none');
    }
    if (item.target.tabIndex == 1) {
      setCheckSort2('block');
    } else {
      setCheckSort2('none');
    }
    if (item.target.tabIndex == 2) {
      setCheckSort3('block');
    } else {
      setCheckSort3('none');
    }
  
  };

  const checkSort = [
    {
      id: 1,
      title: 'sort by time',
      icon: <CheckOutlined sx={{ display: checkSort1, color: '#00b0ff' }} />,
    },
    {
      id: 2,
      title: "sort by job's name",
      icon: <CheckOutlined sx={{ display: checkSort2, color: '#00b0ff' }} />,
    },
    {
      id: 3,
      title: 'sort by title',
      icon: <CheckOutlined sx={{ display: checkSort3, color: '#00b0ff' }} />,
    },
  ];

  return (
    <>
      <Button
        variant="outline"
        color='primary'
        rounded='pill'
          // sx={{
          //   borderColor: '#E5E7EB',
          //   borderRadius: '20px',
          //   textTransform: 'capitalize',
          //   color: '#00b0ff',
          // }}
          // id="demo-positioned-button"
          // aria-controls={open ? 'demo-positioned-menu' : undefined}
          // aria-haspopup="true"
          // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        view options
        {open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {checkArr.map((item, index) => (
          <MenuItem
            key={index}
            onClick={handleCheck}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '250px',
              cursor: 'pointr',
            }}
          >
            {item.title} {item.icon}
          </MenuItem>
        ))}

        <Divider />
        <MenuItem onClick={handleClose}>
          <FormatListBulletedOutlined sx={{ width: '18px', mr: 1 }} /> List view
        </MenuItem>
        <Divider />
        <MenuItem
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onMouseOver={handleClickSort}
        >
          sort shifts
        </MenuItem>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorElSort}
          open={openSort}
          onClose={handleCloseSort}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ ml: 1 }}
        >
          {checkSort.map((item, index) => (
            <MenuItem key={index} tabIndex={index} onClick={handleCheckSort} sx={{width:"200px",  display: 'flex',  justifyContent: 'space-between'}}>
              {item.title}
              {item.icon}
            </MenuItem>
          ))}
        </Menu>

        <ListSubheader>more options</ListSubheader>
        <MenuItem onClick={handleClose}>minimized view</MenuItem>
        <MenuItem onClick={handleClose}>availabilty status</MenuItem>
      </Menu>
    </>
  );
};

export default OptionButton;
