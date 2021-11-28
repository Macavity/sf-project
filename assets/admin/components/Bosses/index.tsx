import React from 'react';
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  NumberInput, ReferenceInput,
  required, SearchInput,
  SelectField,
  SelectInput,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';
import { BugReport } from '@mui/icons-material';

const validateRequired = required();

const elementChoices = [
  { id: 0, name: 'None' },
  { id: 1, name: 'Fire' },
  { id: 2, name: 'Lightning' },
  { id: 3, name: 'Frost' },
  { id: 4, name: 'Earth' },
];

const bossFilters = [
  <SearchInput source="name" alwaysOn />,
];

export const BossList = (props: any) => (
  <List {...props} filters={bossFilters}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <SelectField source="primaryElement" choices={elementChoices} />
      <SelectField source="secondaryElement" choices={elementChoices} />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const BossCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <TextInput source="name" validate={validateRequired} />
        <SelectInput source="primaryElement" choices={elementChoices} />
        <SelectInput source="secondaryElement" choices={elementChoices} />
      </SimpleForm>
    </Create>
  );
};


export const BossEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm redirect="list">
      <NumberInput disabled source="id" validate={validateRequired} />
      <TextInput source="name" validate={validateRequired} />
      <SelectInput source="primaryElement" choices={elementChoices} />
      <SelectInput source="secondaryElement" choices={elementChoices} />
    </SimpleForm>
  </Edit>
);

export default {
  list: BossList,
  create: BossCreate,
  edit: BossEdit,
  icon: BugReport,
};
