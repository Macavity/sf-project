import { editSetupURL } from '../helpers/adminLinks';

interface LocalProps {
    setupId: number;
}

export const EditSetupButton = (props: LocalProps) => {
    return (
        <a className="btn btn-secondary btn-sm"
           href={editSetupURL(props.setupId)}
           target="_blank"
           rel="noreferrer">Edit Setup</a>
    );
};
