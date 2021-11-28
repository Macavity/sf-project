import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Create,
  SimpleForm,
  TextInput,
  Edit,
  ShowButton,
  EditButton,
  required, NumberField, NumberInput, ShowGuesser, SelectInput, ReferenceInput
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import { SkillCreate, SkillEdit, SkillList } from '../Skills';
import { ClassType } from '../../enums/ClassType';

const validateRequired = required();

export const JobFilter = (props: any) => (
    <ReferenceInput reference="jobs" source="job" label="Job" alwaysOn>
      <SelectInput value="name"/>
    </ReferenceInput>
);

export const filterGladiator = { 'job': ClassType.Gladiator };
export const filterWarrior = { 'job': ClassType.Warrior };
export const filterDruid = { 'job': ClassType.Druid };
export const filterShaman = { 'job': ClassType.Shaman };
export const filterAssassin = { 'job': ClassType.Assassin };
export const filterHunter = { 'job': ClassType.Hunter };
export const filterMage = { 'job': ClassType.Mage };
export const filterWarlock = { 'job': ClassType.Warlock };

export const JobList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <NumberField source="id" />
      <EmailField source="slug" />
      <EmailField source="name" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const JobCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <NumberInput source="id" />
      <TextInput source="name" validate={validateRequired} />
      <TextInput source="slug" validate={validateRequired} />
    </SimpleForm>
  </Create>
);

export const JobEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="id" validate={validateRequired} />
      <TextInput source="name" validate={validateRequired} />
      <TextInput source="slug" validate={validateRequired} />
    </SimpleForm>
  </Edit>
);

export default {
  list: JobList,
  create: JobCreate,
  edit: JobEdit,
  show: ShowGuesser,
};
