import { ArrowDropDownOutlined, ArrowDropUpOutlined, ContentCopy, FileDownloadOutlined, FileUploadOutlined, LocalPrintshopOutlined, Login, PersonOff, RemoveCircleOutline, VisibilityOff } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Button } from 'rizzui';

const ActionButton = () => {
  const action = [
    {
      title: 'copy previous week',
      icon:<ContentCopy/>
    },
    {
      title: 'clear week',
      icon:<RemoveCircleOutline/>
    },
    {
      title: 'unpublish week',
      icon:<VisibilityOff/>
    },  {
      title: 'unassign week',
      icon:<PersonOff/>
    },  {
      title: 'export week',
      icon:<Login/>
    },  {
      title: 'print week',
      icon:<LocalPrintshopOutlined/>
    },  {
      title: 'templates',
      icon:""
    },  {
      title: 'save week as temlate',
      icom:<FileDownloadOutlined/>
    }, {
      title: 'load week template',
      icon:""
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
  return (
    <>
         <Button
         variant="outline"
         color="primary"
         rounded="pill"
          // onClick={() => setOpen(!open)}
          sx={{
            // borderColor: '#E5E7EB',
            // borderRadius: '20px',
            textTransform: 'capitalize',
            // color: '#00b0ff',
          }}
          onClick={handleClick}
        >
          Actions
          {open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
        </Button>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ ml: 1 }}
      >
        {action.map((item, index) => (
          <MenuItem
            key={index}
            tabIndex={index}
            onClick={handleClick}
            sx={{
              width: '200px',
            }}
          >
            {item.icon}
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ActionButton;
