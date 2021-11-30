import { Chip } from '@mui/material';
import { ElementType } from 'assets/frontend/enums/ElementType';
import styled from 'styled-components';

type Props = {
  element: ElementType | null;
}

const StyledElement = styled.span`
  margin: 0 2px;
`;


export const ElementTag = ({ element }: Props) => {
  if(element === null){
    return <p>-</p>;
  }

  let badge;
  switch (element){
    case ElementType.Fire:
      badge = <Chip label="Fire" size="small" color="error"/>;
      break;
    case ElementType.Lightning:
      badge = <Chip label="Lightning" size="small" color="warning" sx={{backgroundColor: 'gold', color: 'white'}}/>;
      break;
    case ElementType.Frost:
      badge = <Chip label="Frost" size="small" color="primary"/>;
      break;
    case ElementType.Earth:
      badge = <Chip label="Earth" size="small" sx={{backgroundColor: 'rgb(99, 0, 15)', color: 'white'}}/>;
      break;
  }

  return (
    <StyledElement>
      {badge}
    </StyledElement>
  );
};
