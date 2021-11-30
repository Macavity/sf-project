import {
    Create,
    DateField,
    Edit,
    FormTab,
    NumberField,
    NumberInput,
    ReferenceInput,
    SelectInput,
    Show,
    TabbedForm,
    TabbedShowLayout,
    TextField,
} from 'react-admin';
import React from 'react';
import { sortByName, sortBySlug, validateRequired } from './index';
import { Grid } from '@mui/material';
import {
    filterAssassin,
    filterDruid,
    filterGladiator,
    filterHunter,
    filterMage,
    filterShaman,
    filterWarlock,
    filterWarrior
} from '../Jobs';


const tabs = [
    {
        label: 'Tank', jobs: [
            { label: 'Gladiator', filter: filterGladiator, attrPrefix: 'gladiator' },
            { label: 'Warrior', filter: filterWarrior, attrPrefix: 'warrior' },
        ],
    },
    {
        label: 'heal', jobs: [
            { label: 'Druid', filter: filterDruid, attrPrefix: 'druid' },
            { label: 'Shaman', filter: filterShaman, attrPrefix: 'shaman' },
        ],
    },
    {
        label: 'Single Target', jobs: [
            { label: 'Assassin', filter: filterAssassin, attrPrefix: 'assassin' },
            { label: 'Warlock', filter: filterWarlock, attrPrefix: 'warlock' },
        ],
    },
    {
        label: 'Multi Target', jobs: [
            { label: 'Hunter', filter: filterHunter, attrPrefix: 'hunter' },
            { label: 'Mage', filter: filterMage, attrPrefix: 'mage' },
        ],
    },
];

export const PartySetupShow = (props: any) => (
    <Show {...props}>
        <TabbedShowLayout>
            <NumberField source="id"/>
            <TextField source="zone.name"/>
            <NumberField source="stageLevel"/>

            <NumberField source="gladiator.skill1"/>
            <DateField source="warrior.skill1"/>
            <DateField source="druid.skill1"/>
            <NumberField source="shaman.skill1"/>
            <NumberField source="assassin.skill1"/>
            <NumberField source="hunter.skill1"/>
            <DateField source="mage.skill1"/>
            <DateField source="warlock.skill1"/>
            <TextField source="boss.name"/>
        </TabbedShowLayout>
    </Show>
);

export const PartySetupCreate = (props: any) => {
    return (
        <Create {...props}>
            <TabbedForm redirect="list">
                <FormTab label="Summary">
                    <ReferenceInput label="Boss"
                                    sort={sortByName}
                                    source="boss"
                                    reference="bosses"
                                    perPage={100}
                                    validate={validateRequired}>
                        <SelectInput optionText="name"/>
                    </ReferenceInput>
                    <ReferenceInput label="Zone"
                                    sort={sortByName}
                                    source="zone"
                                    reference="zones"
                                    validate={validateRequired}>
                        <SelectInput optionText="name"/>
                    </ReferenceInput>
                    <NumberInput source="stageLevel" validate={validateRequired}/>
                </FormTab>
                {tabs.map(({ label, jobs }, i) => (
                    <FormTab label={label} key={'form-' + i}>
                        <Grid container spacing={2}>
                            {jobs.map(({ label, attrPrefix, filter }, j) => (
                                <Grid item xs={6} key={'grid-' + j}>
                                    <h2>{label}</h2>
                                    <ReferenceInput label={label}
                                                    source={`${attrPrefix}Rotation`}
                                                    reference="job_rotations"
                                                    filter={filter}
                                                    perPage={100}
                                                    sort={sortBySlug}>
                                        <SelectInput id="originId" optionText="slug"/>
                                    </ReferenceInput>
                                </Grid>
                            ))}
                        </Grid>
                    </FormTab>
                ))}
            </TabbedForm>
        </Create>
    );
};

//export const SkillSelectInput =

export const PartySetupEdit = (props: any) => (
    <Edit {...props}>
        <TabbedForm redirect="list">
            <FormTab label="Summary">
                <ReferenceInput label="Boss"
                                sort={sortByName}
                                source="boss"
                                reference="bosses"
                                perPage={100}
                                validate={validateRequired}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <ReferenceInput label="Zone"
                                sort={sortByName}
                                source="zone"
                                reference="zones"
                                validate={validateRequired}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <NumberInput source="stageLevel" validate={validateRequired}/>
            </FormTab>
            {tabs.map(({ label, jobs }, j) => (
                <FormTab label={label} key={'form-' + j}>
                    <Grid container spacing={2}>
                        {jobs.map(({ label, attrPrefix, filter }, i) => (
                            <Grid key={'jobs-' + i} item xs={6}>
                                <h2>{label}</h2>
                                <ReferenceInput label={label}
                                                source={`${attrPrefix}Rotation`}
                                                reference="job_rotations"
                                                filter={filter}
                                                perPage={100}
                                                sort={sortBySlug}>
                                    <SelectInput id="originId" optionText="slug"/>
                                </ReferenceInput>
                            </Grid>
                        ))}
                    </Grid>
                </FormTab>
            ))}
        </TabbedForm>
    </Edit>
);
