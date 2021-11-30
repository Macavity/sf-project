import { ReferenceField, TextField } from 'react-admin';
import React from 'react';

export const JobReference = (props: any) => (
    <ReferenceField label="Job" reference="jobs" source="job">
        <TextField source="name" label="Job"/>
    </ReferenceField>
);
