import { React, Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import API_URL from "../../constants/api-url";
import UserList from "./users/user-list.component";
import UserShow from "./users/user-show.component";
import UserEdit from "./users/user-edit.component";
import UserCreate from "./users/user-create.component";

const dataProvider = jsonServerProvider(API_URL);

export default class TejkoAdmin extends Component {

    render() {
        return (
            <Admin dataProvider={dataProvider}>
                <Resource name="users" list={UserList} edit={UserShow} show={UserEdit} create={UserCreate} />
                <Resource name="scores" list={ListGuesser} />
                <Resource name="games" list={ListGuesser} />
            </Admin>
        );
    };

};