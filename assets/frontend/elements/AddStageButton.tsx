import { Button } from '@mui/material';
import { addStageURL } from '../helpers/adminLinks';

export const AddStageButton = (props: any) => {
    return (
        <Button href={addStageURL()} variant="contained" target="_blank">Add Stage</Button>
    );
};
