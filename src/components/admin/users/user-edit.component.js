import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from 'react-admin';
import { React, Component } from "react";

export default class UserList extends Component {

    render() {
        let props = this.props;
        return (
            <Edit {...props}>
                <SimpleForm>
                    <TextInput source="id" />
                    <TextInput source="username" />
                    <ArrayInput source="roles"><SimpleFormIterator><TextInput source="id" />
                        <TextInput source="label" /></SimpleFormIterator></ArrayInput>
                </SimpleForm>
            </Edit>
        );
    }
}