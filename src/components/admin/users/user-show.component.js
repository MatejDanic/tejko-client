

import { Show, Datagrid, TextField, ArrayField, SimpleShowLayout } from 'react-admin';
import { React, Component } from "react";

export default class UserList extends Component {

    render() {
        let props = this.props;
        return (
            <Show {...props}>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="username" />
                    <ArrayField source="roles"><Datagrid><TextField source="id" />
                        <TextField source="label" /></Datagrid></ArrayField>
                </SimpleShowLayout>
            </Show>
        );
    }
}