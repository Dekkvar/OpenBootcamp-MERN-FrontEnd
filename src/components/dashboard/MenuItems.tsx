import React from 'react';

// Material List Components
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Material Icon Components
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const MenuItems = (
  <React.Fragment>
    {/* Dashboard to Katas Button */}
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Katas'/>
    </ListItemButton>
    {/* Users Button */}
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary='Users'/>
    </ListItemButton>
    {/* Ranking Button */}
    <ListItemButton>
      <ListItemIcon>
        <EmojiEventsIcon />
      </ListItemIcon>
      <ListItemText primary='Ranking'/>
    </ListItemButton>
  </React.Fragment>
)