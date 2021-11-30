import { PartySetupCreate, PartySetupEdit } from './PartySetupCreate';
import { PartySetupList } from './PartySetupList';
import { required, ShowGuesser } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';

export const sortByName = { field: 'name', order: 'ASC' };
export const sortBySlug = { field: 'slug.name', order: 'ASC' };
export const sortZone = { field: 'scoreStart', order: 'ASC' };
export const validateRequired = required();

export default {
  list: PartySetupList,
  create: PartySetupCreate,
  edit: PartySetupEdit,
  show: ShowGuesser,
  icon: BookIcon,
};
