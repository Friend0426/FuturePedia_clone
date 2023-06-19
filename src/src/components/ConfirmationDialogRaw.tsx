import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const options = [
  'free',
  'free trial',
  'contact for pricing',
  'freemium',
  'paid',
  'deals',
  'waistlist',
  'mobile app',
  'open source',
  'api',
  'Triton',
  'No signup required',
];

// const tabsStyles = makeStyles(theme => ({
//   arrowButtons: {
//     '& .MuiTabScrollButton-root': {
//       color: 'transparent', // hide default arrow color
//       position: 'relative',
//     },
//     '& .MuiTabScrollButton-root:before': {
//       content: '""',
//       position: 'absolute',
//       top: 0,
//       bottom: 0,
//       left: 0,
//       right: 0,
//       background: 'linear-gradient(to right, red, blue)', // replace with your desired gradient colors
//       opacity: 0.7,
//       borderRadius: '50%',
//       transition: 'opacity 0.3s, transform 0.3s',
//     },
//     '& .MuiTabScrollButton-root:hover:before': {
//       opacity: 1,
//       transform: 'scale(1.2)',
//     },
//   },
// }));
export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Filters</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ConfirmationDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');
  const [age, setAge] = React.useState('');

  const [tabValue, settabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, tabValue: number) => {
    settabValue(tabValue);
  };
  
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div className="flex flex-nowrap">
      <div className="inline-block">
      <List component="div" role="group" className='mr-2 inline-block border bg-gray-100 rounded-lg border-gray-200'>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
        >
          {/* <ListItemText primary="Filter" secondary={value} /> */}
          {/* <ListItemText primary="Filter" secondary={value} /> */}
          <svg
            className='mr-2'
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
        >
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>          
          <p>Filters</p>
        </ListItem>
      
        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
      </div>
    
      <div>
        <Box className="inline-block"
          sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
              m: 1,
              },
          }}
        >
          <Tabs
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
                margin: '0 16px',
                minHeight: '48px',
                width: '48px',
                '& svg': {
                  fill: '#f472f6',
                  fontSize: 40,
                  transform: 'scale(1.6)',
                },
            },
            maxWidth: { xs: 720, sm: 780 } ,
            }}      
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
          >

            <Tab label="3d"  sx={{
              background: '#d0d6d6 !important',
              border: '1px solid grey',
              borderRadius: '40px',
              px: 2,
              py: 1,
              minHeight: 10,
              width: 20,
              minWidth: 100,
              height: 30,
              mr: 1,
              mt:1,
              backgroundColor: 'blue',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
              opacity: 0.6
            }}/>
          
          
            <Tab label="audio"  sx={{
            background: '#d0d6d6 !important',
            border: '1px solid grey',
            borderRadius: '40px',
            px: 2,
            py: 1,
            minHeight: 10,
            width: 20,
            minWidth: 100,
            height: 30,
            mr: 1,
            mt:1,
            backgroundColor: 'blue',
            fontSize: 12,
            fontWeight: 'bold',
            color: 'black',
            opacity: 0.6
            }}/>
            
            <Tab label="speech"  sx={{
            background: '#d0d6d6 !important',
            border: '1px solid grey',
            borderRadius: '40px',
            px: 2,
            py: 1,
            minHeight: 10,
            width: 20,
            minWidth: 100,
            height: 30,
            mr: 1,
            mt:1,
            backgroundColor: 'blue',
            fontSize: 12,
            fontWeight: 'bold',
            color: 'black',
            opacity: 0.6
            }}/>
            
            <Tab label="audio"  sx={{
            background: '#d0d6d6 !important',
            border: '1px solid grey',
            borderRadius: '40px',
            px: 2,
            py: 1,
            minHeight: 10,
            width: 20,
            minWidth: 100,
            height: 30,
            mr: 1,
            mt:1,
            backgroundColor: 'blue',
            fontSize: 12,
            fontWeight: 'bold',
            color: 'black',
            opacity: 0.6
            }}/>
            
            <Tab label="editing"  sx={{
            background: '#d0d6d6 !important',
            border: '1px solid grey',
            borderRadius: '40px',
            px: 2,
            py: 1,
            minHeight: 10,
            width: 20,
            minWidth: 100,
            height: 30,
            mr: 1,
            mt:1,
            backgroundColor: 'blue',
            fontSize: 12,
            fontWeight: 'bold',
            color: 'black',
            opacity: 0.6
            }}/>
            
            <Tab label="travel"  sx={{
            background: '#d0d6d6 !important',
            border: '1px solid grey',
            borderRadius: '40px',
            px: 2,
            py: 1,
            minHeight: 10,
            width: 20,
            minWidth: 100,
            height: 30,
            mr: 1,
            mt:1,
            backgroundColor: 'blue',
            fontSize: 12,
            fontWeight: 'bold',
            color: 'black',
            opacity: 0.6
            }}/>
            
            <Tab label="customer"  sx={{
              background: '#d0d6d6 !important',
              border: '1px solid grey',
              borderRadius: '40px',
              px: 2,
              py: 1,
              minHeight: 10,
              width: 20,
              minWidth: 100,
              height: 30,
              mr: 1,
              mt:1,
              backgroundColor: 'blue',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
              opacity: 0.6
            }}/>
            <Tab label="tool"  sx={{
              background: '#d0d6d6 !important',
              border: '1px solid grey',
              borderRadius: '40px',
              px: 2,
              py: 1,
              minHeight: 10,
              width: 20,
              minWidth: 100,
              height: 30,
              mr: 1,
              mt:1,
              backgroundColor: 'blue',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
              opacity: 0.6
            }}/>
            <Tab label="fun"  sx={{
              background: '#d0d6d6 !important',
              border: '1px solid grey',
              borderRadius: '40px',
              px: 2,
              py: 1,
              minHeight: 10,
              width: 20,
              minWidth: 100,
              height: 30,
              mr: 1,
              mt:1,
              backgroundColor: 'blue',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
              opacity: 0.6
            }}/>
            <Tab label="design"  sx={{
              background: '#d0d6d6 !important',
              border: '1px solid grey',
              borderRadius: '40px',
              px: 2,
              py: 1,
              minHeight: 10,
              width: 20,
              minWidth: 100,
              height: 30,
              mr: 1,
              mt:1,
              backgroundColor: 'blue',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
              opacity: 0.6
            }}/>
            <Tab label="com"  sx={{
              background: '#d0d6d6 !important',
              border: '1px solid grey',
              borderRadius: '40px',
              px: 2,
              py: 1,
              minHeight: 10,
              width: 20,
              minWidth: 100,
              height: 30,
              mr: 1,
              mt:1,
              backgroundColor: 'blue',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
              opacity: 0.6
            }}/>
            
            
          </Tabs>
        </Box>
      </div>
    
      <div>
      <Box sx={{ minWidth: 180 }} className="inline-block bg-gray-100">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
          <MenuItem value={10}>Verifed</MenuItem>
          <MenuItem value={20}>New</MenuItem>
          <MenuItem value={30}>Popular</MenuItem>
          </Select>
        </FormControl>
      </Box>
      </div>
      
   

    </div>
    
  );
}