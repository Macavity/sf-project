import { editStageURL } from '../helpers/adminLinks';

interface LocalProps {
    stageId: number;
}

export const EditStageButton = (props: LocalProps) => {
    return (
        <a className="btn btn-secondary btn-sm"
           href={editStageURL(props.stageId)}
           target="_blank" rel="noreferrer">Edit Stage</a>
    );
};
