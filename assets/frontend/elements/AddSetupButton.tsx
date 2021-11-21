import { Button } from '@mui/material';
import { addSetupURL } from '../helpers/adminLinks';

export const AddSetupButton = (props: any) => {
    return (
        <Button href={addSetupURL()} variant="contained" target="_blank">Add Setup</Button>
    );
};
