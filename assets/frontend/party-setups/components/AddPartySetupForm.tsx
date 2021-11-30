import { Box, Tab, Tabs } from '@mui/material';
import { Component } from 'react';

interface LocalProps {}

interface LocalState {

}

export class AddPartySetupForm extends Component<LocalProps, LocalState> {
    render() {
        return (
            <div className="add-setup-form">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs>
                        <Tab label="General" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                    </Tabs>
                </Box>
            </div>
        );
    }
}
