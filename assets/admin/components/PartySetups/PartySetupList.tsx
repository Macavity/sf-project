import { Datagrid, EditButton, List, ReferenceField, ReferenceInput, SelectInput, ShowButton, TextField } from 'react-admin';
import React from 'react';
// @ts-ignore
import { ListGuesser } from '@api-platform/admin';


const filters = [
  <ReferenceInput label="Zone" source="zone" reference="zones" sort={{field: 'name', order:'ASC'}} alwaysOn>
    <SelectInput optionText="name" />
  </ReferenceInput>,
  <ReferenceInput label="Boss" source="boss" reference="bosses" sort={{field: 'name', order:'ASC'}} alwaysOn>
    <SelectInput optionText="name" />
  </ReferenceInput>
];

export const PartySetupList = (props:any) => (
  <List {...props} filters={filters} sort={{field:'level', order: 'ASC'}}>
    <Datagrid rowClick="edit">
      <ReferenceField label="Zone" source="zone" reference="zones">
        <TextField source="name" />
      </ReferenceField>
      <TextField label="Level" source="stageLevel" />
      <ReferenceField label="Boss" source="boss" reference="bosses">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);
