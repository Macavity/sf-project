import React from 'react';
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  EmailField,
  List,
  NumberField,
  NumberInput,
  required,
  ShowButton,
  ShowGuesser,
  SimpleForm,
  TextInput,
} from 'react-admin';
import ExploreIcon from '@mui/icons-material/Explore';

const validateRequired = required();

export const ContinentList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <EmailField source="slug" />
      <EmailField source="name" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const ContinentCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <NumberInput source="id" />
      <TextInput source="name" validate={validateRequired} />
      <TextInput source="slug" validate={validateRequired} />
    </SimpleForm>
  </Create>
);

export const ContinentEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="id" validate={validateRequired} />
      <TextInput source="name" validate={validateRequired} />
      <TextInput source="slug" validate={validateRequired} />
    </SimpleForm>
  </Edit>
);

export default {
  list: ContinentList,
  create: ContinentCreate,
  edit: ContinentEdit,
  show: ShowGuesser,
  icon: ExploreIcon,
};

