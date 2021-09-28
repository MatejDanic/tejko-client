

import React, { Component } from "react";
import GameService from "../../../services/game.service";
import "../admin.css";

export default class GameView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            game: {}
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.gameId);
        GameService.getGame(this.props.match.params.gameId)
            .then(game => {
                this.setState({ game });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let game = this.state.game;
        return (
            <div>
                <h2>Game</h2>
                <div>
                    <b>ID: </b>{game.id}
                </div>
                <div>
                    <b>Name: </b>{game.name}
                </div>
                <div>
                    <b>Description: </b>{game.description}
                </div>
            </div>
        );
    }

}