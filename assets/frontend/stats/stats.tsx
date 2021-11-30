import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export default function Stats(){
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>

                <ListItemAvatar>

                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
        </List>
    );
}
