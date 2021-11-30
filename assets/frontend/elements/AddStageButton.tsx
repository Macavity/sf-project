import { Button } from '@mui/material';
import { addStageURL } from '../helpers/adminLinks';

export const AddStageButton = () => {
    return (
        <Button href={addStageURL()} variant="contained" target="_blank">Add Stage</Button>
    );
};
