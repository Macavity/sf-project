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
    ReferenceInput,
    required,
    SelectInput,
    ShowButton,
    ShowGuesser,
    SimpleForm,
    TextInput
} from 'react-admin';
import { ClassType } from '../../enums/ClassType';

const validateRequired = required();

export const JobFilter = () => (
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

// const jobChoices = [
//     { id: ClassType.Gladiator, name: 'Gladiator' },
//     { id: ClassType.Druid, name: 'Druid' },
//     { id: ClassType.Warrior, name: 'Warrior' },
//     { id: ClassType.Shaman, name: 'Shaman' },
//     { id: ClassType.Mage, name: 'Mage' },
//     { id: ClassType.Hunter, name: 'Hunter' },
//     { id: ClassType.Assassin, name: 'Assassin' },
//     { id: ClassType.Warlock, name: 'Warlock' },
// ];

export const JobList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <NumberField source="id"/>
            <EmailField source="slug"/>
            <EmailField source="name"/>
            <ShowButton/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const JobCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm redirect="show">
            <NumberInput source="id"/>
            <TextInput source="name" validate={validateRequired}/>
            <TextInput source="slug" validate={validateRequired}/>
        </SimpleForm>
    </Create>
);

export const JobEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm redirect="list">
            <NumberInput source="id" validate={validateRequired}/>
            <TextInput source="name" validate={validateRequired}/>
            <TextInput source="slug" validate={validateRequired}/>
        </SimpleForm>
    </Edit>
);

export default {
    list: JobList,
    create: JobCreate,
    edit: JobEdit,
    show: ShowGuesser,
};
