import React from 'react';
import {
    AutocompleteInput,
    Create,
    Datagrid,
    EditGuesser,
    List,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    ShowGuesser,
    SimpleForm,
    TextField,
    TextInput,
} from 'react-admin';
import { sortByName } from '../PartySetups';

const validateRequired = required();

const filterByName = (searchText: any) => {
    if (!searchText.length) {
        return null;
    }

    return ({ name: searchText });
};
const enableChoices = (params: any) => {
    return (params.name ? params.name.length >= 2 : false);
};

const filters = [
    <ReferenceInput reference="jobs" source="job" label="Job" key="filter-j" alwaysOn>
        <SelectInput value="name"/>
    </ReferenceInput>,
    <ReferenceInput reference="skills"
                    key="filter-s"
                    source="skill1"
                    label="Skill 1"
                    perPage={200}
                    alwaysOn>
        <SelectInput value="label"/>
    </ReferenceInput>,
    <ReferenceInput reference="skills" key="filter-s2" source="skill2" label="Skill 2">
        <SelectInput value="label"/>
    </ReferenceInput>,
];

export const JobRotationList = (props: any) => (
    <List {...props} filters={filters}>
        <Datagrid rowClick="edit">
            <TextField source="@id"/>
            <ReferenceField reference="jobs" source="job">
                <TextField source="name" label="Job"/>
            </ReferenceField>
            <ReferenceField sortBy="skill1.name" reference="skills" source="skill1">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField sortBy="skill2.name" reference="skills" source="skill2">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField sortBy="skill3.name" reference="skills" source="skill3">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField sortBy="skill4.name" reference="skills" source="skill4">
                <TextField source="name"/>
            </ReferenceField>
        </Datagrid>
    </List>
);

// (<ReferenceInput label={`Skill ${value}`}
//                  source={`skill${value}`}
//                  reference="skills"
//                  filter={filter}
//                  sort={sortByName}>
//     <SelectInput optionText="name"/>
// </ReferenceInput>)


const JobRotationCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <ReferenceInput
                label="Job"
                sort={sortByName}
                source="job"
                reference="jobs"
                validate={validateRequired}>
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="description"/>
            {[1, 2, 3, 4].map(value => (
                <ReferenceInput label={`Skill ${value}`}
                                key={`skill-${value}`}
                                sort={sortByName}
                                source={`skill${value}`}
                                reference="skills"
                                perPage={10}
                                filterToQuery={filterByName}
                                enableGetChoices={enableChoices}>
                    <AutocompleteInput filter="name"
                                       optionText="name"
                                       shouldRenderSuggestions={(value: string) => value.length >= 2}/>
                </ReferenceInput>
            ))}
        </SimpleForm>
    </Create>
);

export default {
    list: JobRotationList,
    create: JobRotationCreate,
    edit: EditGuesser,
    show: ShowGuesser,
};
