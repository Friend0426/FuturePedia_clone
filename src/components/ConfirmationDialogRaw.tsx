import React, {useState, useRef, useEffect, ChangeEvent, SyntheticEvent} from 'react';
import Button from '@mui/material/Button';
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
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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

const tabs = [
  "All",
  "3D",
  "art",
  "audio editing",
  "avatars",
  "code assistant",
  "copywriting",
  "customer support",
  "dating",
  "design assistant",
  "developer tools",
  "e-commerce",
  "education assistant",
  "email assistant",
  "experiments",
  "fashion",
  "finance",
  "fitness",
  "fun tools",
  "gaming",
  "general writing",
  "gift ideas",
  "healthcare",
  "human resources",
  "image editing",
  "image generator",
  "legal assistant",
  "life assistant",
  "logo generator",
  "low-code/no-code",
  "memory",
  "music",
  "paraphraser",
  "personalized videos",
  "presentations",
  "productivity",
  "prompts",
  "real estate",
  "religion",
  "research",
  "resources",
  "sales",
  "search engine",
  "SEO",
  "social media assistant",
  "spreadsheets",
  "SQL",
  "startup tools",
  "story teller",
  "summarizer",
  "text to speech",
  "transcriber",
  "travel",
  "video editing",
  "video generator",
];

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Dione');
  const [age, setAge] = useState('');

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, tabValue: number) => {
    setTabValue(tabValue);
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
    <>
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
      <div className="flex flex-nowrap">

        <Button
          onClick={handleClickListItem}
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "10px",
            height: "50px",
            width: "160px",
            border: "1px solid lightgray",
          }}
          endIcon={
            <FilterAltIcon />
          }
        >
          Filter
        </Button>
      
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className='tabBar'
        >{
          tabs.map(val => <Tab label={val} className='tabItem' />)
        }</Tabs>

        <FormControl>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            value={age}
            label="Sort by"
            onChange={handleChange}
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: "10px",
              height: "50px",
              width: "160px",
            }}
          >
            <MenuItem value={10} className='listItem'>Verified</MenuItem>
            <MenuItem value={20} className='listItem'>Freemium</MenuItem>
            <MenuItem value={30} className='listItem'>Deal</MenuItem>
          </Select>
        </FormControl>

      </div>
    </>
  );
}