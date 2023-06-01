

import React, { Component } from "react";
import ScoreService from "../../services/score.service";
import DateUtil from "../../utils/date.util";
import { pagination } from "../../utils/pagination.util";
import { sortTable } from "../../utils/sort.util";
import { dateFormatMedium } from "../../constants/date-format";
import "./board.css";

export default class ScoreList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scores: [],
            messages: []
        };
    }

    componentDidMount() {
        if (this.props.scores == null) {
            ScoreService.getScores()
                .then(response => {
                    let scores = [];
                    for (let key in response) {
                        scores.push(response[key]);
                    }
                    this.setState({ scores }, () => {
                        sortTable(0, false);
                        pagination();
                    });
                })
                .catch(response => {
                    let messages = [];
                    if (response.status && response.error) messages.push(response.status + " " + response.error);
                    if (response.message) messages.push(response.message);
                });
        } else {
            let scores = [];
            for (let key in this.props.scores) {
                scores.push(this.props.scores[key]);
            }
            this.setState({ scores }, () => {
                sortTable(0, false);
                pagination();
            });
        }
        document.getElementById("current-page").label = 1;
    }

    render() {
        let username = this.props.username;
        let scores = this.state.scores;
        let messages = this.state.messages;
        return (
            <div className="container-custom">
                <div className="container-custom-table">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th onClick={() => sortTable(0)}>Datum</th>
                                {!username && <th onClick={() => sortTable(1)}>Ime</th>}
                                <th onClick={() => sortTable(2)}>Vrijednost</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {scores && scores.map(score =>
                                <tr className={"tr"} key={score.id} id={score.id} onClick={() => { this.props.history.push("/scores/" + score.id) }}>
                                    <td>{dateFormatMedium.format(DateUtil.getDateFromLocalDateTime(score.date))}</td>
                                    {!username && <td>{score.user.username}</td>}
                                    <td>{score.value}</td>
                                </tr>)}
                        </tbody>
                    </table>
                    <div className="container-pagination">
                        <div id="pagination" />
                    </div>
                    <div id="current-page" />
                </div>
            </div>
        );
    }
}
