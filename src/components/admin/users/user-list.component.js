import { List, Datagrid, TextField, ArrayField, SingleFieldList, ChipField } from 'react-admin';
import { React, Component } from "react";

export default class UserList extends Component {

    render() {
        let props = this.props;
        return (
            <List {...props}>
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="username" />
                    <ArrayField source="roles"><SingleFieldList><ChipField source="id" /></SingleFieldList></ArrayField>
                </Datagrid>
            </List>
        );
    }
}