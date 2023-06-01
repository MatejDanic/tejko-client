import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ScoreService from "../../services/score.service";
import DateUtil from "../../utils/date.util";
import { dateFormatLong } from "../../constants/date-format";
import "./board.css";

export default class Score extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
            score: "",
            messages: []
        };
        this.deleteScore = this.deleteScore.bind(this);
    }

    componentDidMount() {
        let currentUser = AuthService.getCurrentUser();
        if (currentUser) this.setState({ currentUser });

        ScoreService.getScore(this.props.match.params.scoreId)
            .then(response => {
                this.setState({ score: response });
            })
            .catch(response => {
                let messages = [];
                if (response.status && response.error) messages.push(response.status + " " + response.error);
                if (response.message) messages.push(response.message);
            });
    }

    deleteScore() {
        ScoreService.deleteScore(this.props.match.params.scoreId)
            .then(response => {
                let messages = [];
                messages.push(response.message);
                setTimeout(() => { this.props.history.push("/scores") }, 1000);
            })
            .catch(response => {
                let messages = [];
                if (response.status && response.error) messages.push(response.status + " " + response.error);
                if (response.message) messages.push(response.message);
            });
    }

    render() {
        let currentUser = this.state.currentUser;
        let score = this.state.score;
        let messages = this.state.messages;
        return (
            <div className="container-custom">
                <div className="container-custom-inner">
                    <p>
                        {score.user && <button className="button-profile" onClick={() => { this.props.history.push("/users/" + score.user.id) }}>{score.user.username}</button>}
                    </p>
                    <h3>
                        <strong>Vrijednost: </strong>
                        {score.value}
                    </h3>
                    <p>
                        <strong>ID: </strong>
                        {score.id}
                    </p>
                    <p>
                        <strong>Datum: </strong>
                        {score.date && dateFormatLong.format(DateUtil.getDateFromLocalDateTime(score.date))}
                    </p>
                    {currentUser && currentUser.roles.includes("ADMIN") &&
                        <button className="delete-button" style={{ backgroundImage: "url(/images/misc/trash_closed.png)" }}
                        />}
                </div>
                {currentUser && currentUser.roles.includes("ADMIN") && <div className="container-button">
                </div>}
            </div>
        );
    }
}
