import { ElementType } from 'assets/frontend/enums/ElementType';
import styled from 'styled-components';

type Props = {
  element: ElementType | null;
}

const EarthDiv = styled.div`
  --bs-bg-opacity: 1;
  background-color: rgb(99, 0, 15) !important;
`;

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
      badge = <div className="badge bg-danger">Fire</div>;
      break;
    case ElementType.Lightning:
      badge = <div className="badge bg-warning">Thunder</div>;
      break;
    case ElementType.Frost:
      badge = <div className="badge bg-info">Frost</div>;
      break;
    case ElementType.Earth:
      badge = <EarthDiv className="badge">Earth</EarthDiv>;
      break;
  }

  return (
    <StyledElement>
      {badge}
    </StyledElement>
  );
};
