import { TopToolbar, CreateButton, ExportButton } from 'react-admin';
import { React, Component } from "react";

export default class ListActions extends Component {

    render() {
        return (
            <TopToolbar>
                <CreateButton />
                <ExportButton />
            </TopToolbar>
        );
    }
}