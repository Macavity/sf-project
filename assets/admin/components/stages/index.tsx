import React from 'react';
import {
    AutocompleteInput,
    Create,
    Datagrid,
    Edit,
    List,
    NumberField,
    NumberInput,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    Show,
    ShowGuesser,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    useNotify,
    useRedirect,
    useRefresh,
} from 'react-admin';
import { StageCreateToolbar } from './StageCreateToolbar';

const validateRequired = required();
const sortBoss = { field: 'name', order: 'ASC' };

const enableChoices = (params: any) => {
    return (params.name ? params.name.length >= 2 : false);
};

const filterByName = (searchText: any) => {
    if (!searchText.length) {
        return null;
    }

    return ({ name: searchText });
};

const stageFilters = [
    <ReferenceInput label="Continent" source="continent" reference="continents">
        <SelectInput optionText="name"/>
    </ReferenceInput>,
    <ReferenceInput label="Zone" source="zone" reference="zones" alwaysOn>
        <SelectInput optionText="name"/>
    </ReferenceInput>,
];

export const StageList = (props: any) => (
    <List {...props} filters={stageFilters} perPage={10}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="level"/>
            <ReferenceField label="Zone" reference="zones" source="zone">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Boss" reference="bosses" source="boss">
                <TextField source="name"/>
            </ReferenceField>
        </Datagrid>
    </List>
);

export const StageShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <NumberField source="level"/>
            <TextField label="Zone" source="zone.name"/>
            <TextField label="Boss" source="boss.name"/>
        </SimpleShowLayout>
    </Show>
);

export const StageCreate = (props: any) => {
    const sortZone = { field: 'scoreStart', order: 'ASC' };
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify(`Changes saved`);
        redirect('/stages/');
        refresh();
    };

    // @ts-ignore
    return (
        <Create {...props}>
            <SimpleForm toolbar={<StageCreateToolbar/>}>
                <NumberInput source="level" validate={validateRequired}/>
                <ReferenceInput label="Zone" sort={sortZone} source="zone" reference="zones"
                                validate={validateRequired}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>

                <ReferenceInput label="Boss"
                                sort={sortBoss}
                                source="boss"
                                reference="bosses"
                                perPage={10}
                                filterToQuery={filterByName}
                                enableGetChoices={enableChoices}>
                    <AutocompleteInput filter="name" optionText="name"
                                       shouldRenderSuggestions={(value: string) => value.length >= 2}
                    />
                </ReferenceInput>

            </SimpleForm>
        </Create>
    );
};


export const StageEdit = (props: any) => {
    console.log('props', props);
    return (
        <Edit {...props}>
            <SimpleForm redirect="list">
                <NumberInput disabled source="id" validate={validateRequired}/>
                <NumberInput source="level" validate={validateRequired}/>
                <ReferenceInput label="Zone" source="zone.id" reference="zones" validate={validateRequired}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <ReferenceInput label="Boss"
                                sort={sortBoss}
                                source="boss.id"
                                reference="bosses"
                                perPage={10}
                                filterToQuery={filterByName}
                                enableGetChoices={enableChoices}>
                    <AutocompleteInput filter="name" optionText="name"
                                       shouldRenderSuggestions={(value: string) => value.length >= 2}
                    />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

export default {
    list: StageList,
    create: StageCreate,
    edit: StageEdit,
    show: ShowGuesser,
};
