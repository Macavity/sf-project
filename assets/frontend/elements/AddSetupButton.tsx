import { Button } from '@mui/material';
import { addSetupURL } from '../helpers/adminLinks';

export const AddSetupButton = () => {
    return (
        <Button href={addSetupURL()} variant="contained" target="_blank">Add Setup</Button>
    );
};
