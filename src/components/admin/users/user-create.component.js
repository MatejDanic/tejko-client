import { Create, SimpleForm, TextInput, DateInput } from 'react-admin';
import { React, Component } from "react";

export default class UserList extends Component {

    render() {
        let props = this.props;
        return (
            <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            {/* <RichTextInput source="body" /> */}
            <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
        </SimpleForm>
    </Create>
        );
    }
}