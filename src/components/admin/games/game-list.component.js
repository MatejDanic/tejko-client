

import React, { Component } from "react";
import { Link } from "react-router-dom";
import GameService from "../../../services/game.service";
import "../admin.css";


export default class UserList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            games: []
        };
    }

    componentDidMount() {
        GameService.getGames()
            .then(games => {
                console.log(games);
                this.setState({ games });
            })
            .catch(error => {
                console.error(error);
            });
    }


    render() {
        let games = this.state.games;
        return (
            <table className="table-custom">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game =>
                        <tr key={game.id}>
                            <td><Link to={"/admin/games/" + game.id}>{game.id}</Link></td>
                            <td>{game.name}</td>
                            <td>{game.description}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

}