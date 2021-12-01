import React from 'react';
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    EmailField,
    List,
    NumberInput,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    ShowButton,
    ShowGuesser,
    SimpleForm,
    TextField,
    TextInput,
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';

const validateRequired = required();

const filters = [
    <ReferenceInput reference="jobs" source="job" label="Job" key="filter-j" alwaysOn>
        <SelectInput value="name"/>
    </ReferenceInput>
];

export const SkillList = (props: any) => (
    <List {...props} filters={filters} perPage={50} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid rowClick="show">
            <EmailField source="name"/>
            <EmailField source="shortName"/>
            <ReferenceField label="Job" reference="jobs" source="job">
                <TextField source="name"/>
            </ReferenceField>
            <ShowButton/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const SkillCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <ReferenceInput label="Job" source="job" reference="jobs" validate={validateRequired}>
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="name" validate={validateRequired}/>
            <TextInput source="shortName" validate={validateRequired}/>
        </SimpleForm>
    </Create>
);

export const SkillEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm redirect="list">
            <NumberInput source="id" disabled validate={validateRequired}/>
            <ReferenceInput label="Job" source="job" reference="jobs" validate={validateRequired}>
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="name" validate={validateRequired}/>
            <TextInput source="shortName" validate={validateRequired}/>
        </SimpleForm>
    </Edit>
);

export default {
    list: SkillList,
    create: SkillCreate,
    edit: SkillEdit,
    show: ShowGuesser,
    icon: BookIcon,
};
