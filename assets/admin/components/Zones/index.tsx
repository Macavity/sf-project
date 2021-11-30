import React from 'react';
import {
  Create,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  ShowGuesser,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { PartySetupCreate, PartySetupEdit } from '../PartySetups/PartySetupCreate';
// @ts-ignore
import MapIcon from '@mui/icons-material/Map';
import { ZoneList } from './ZoneList';

const validateRequired = required();

export const ZoneCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <NumberInput source="position" />
      <TextInput source="name" validate={validateRequired} />
      <TextInput source="slug" validate={validateRequired} />
      <ReferenceInput label="Continent" source="continent" reference="continents">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);


export const ZoneEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm redirect="list">
      <NumberInput disabled source="id" validate={validateRequired} />
      <NumberInput source="position" />
      <TextInput source="name" validate={validateRequired} />
      <TextInput source="slug" validate={validateRequired} />
      <ReferenceInput label="Continent" source="continent.id" reference="continents">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default {
  list: ZoneList,
  create: ZoneCreate,
  edit: ZoneEdit,
  show: ShowGuesser,
  icon: MapIcon,
};
