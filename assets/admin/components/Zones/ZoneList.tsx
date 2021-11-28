import {
  Datagrid,
  EditButton,
  EditButtonProps,
  List, ReferenceField,
  ReferenceInput,
  SearchInput,
  SelectInput,
  TextField,
} from 'react-admin';
import React from 'react';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const zoneFilters = [
  <SearchInput source="name" alwaysOn />,
  <ReferenceInput label="Continent" source="continent" reference="continents" alwaysOn>
    <SelectInput optionText="name" />
  </ReferenceInput>,
];
const stopPropagation = (e: any) => e.stopPropagation();

const FrontendDetailPageButton = ({ record }: EditButtonProps) => {
  if (!record) {
    console.log('Empty Record');
    return null;
  }
  console.log('record', record);
  return (
    <Button href={record.detailUrl || '#'}
            onClick={stopPropagation}
            variant="text"
            startIcon={<VisibilityIcon />}>Show</Button>
  );
  // return (
  //   <Button href={''} variant="text" startIcon={VisibilityIcon}>Show</Button>
  // );
};

export const ZoneList = (props: any) => (
  <List {...props} filters={zoneFilters}>
    <Datagrid rowClick="edit">
      <TextField source="position" />
      <TextField source="slug" />
      <TextField source="name" />
      <ReferenceField reference="continents" source="continent">
        <TextField label="Continent" source="name" />
      </ReferenceField>
      <FrontendDetailPageButton {...props} />
      <EditButton />
    </Datagrid>
  </List>
);
