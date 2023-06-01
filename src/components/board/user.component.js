import React, { Component } from "react";
import ScoreList from "./score-list.component";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import DateUtil from "../../utils/date.util";
import ScoreUtil from "../../utils/score.util";
import { dateFormatLong } from "../../constants/date-format";
import "./board.css";

export default class User extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
            userIsAdmin: true,
            user: "",
            totalScore: 0,
            highScore: 0,
            messages: []
        };
        this.deleteUser = this.deleteUser.bind(this);
    }

    setMounted(mounted) {
        this._isMounted = mounted;
    }

    componentDidMount() {
        this.setMounted(true);
        let currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser });
        let userId = this.props.userId ? this.props.userId : this.props.match.params.userId;
        UserService.getUser(userId)
            .then(response => {
                let user = response;
                let userIsAdmin = false;
                if (user) {
                    for (let key in user.roles) {
                        if (user.roles[key].label === "ADMIN") {
                            userIsAdmin = true;
                            break;
                        }
                    }
                }
                let totalScore = ScoreUtil.getTotalScore(user.scores);
                let highScore = ScoreUtil.getHighScore(user.scores);
                if (this._isMounted) this.setState({ user, totalScore, highScore, userIsAdmin });
            })
            .catch(response => {
                let messages = [];
                if (response.status && response.error) messages.push(response.status + " " + response.error);
                if (response.message) messages.push(response.message);
            });
    }

    componentWillUnmount() {
        this.setMounted(false);
    }

    deleteUser() {
        UserService.deleteUser(this.props.match.params.userId)
            .then(response => {
                let messages = [];
                messages.push(response.message);
                setTimeout(() => { this.props.history.push("/users") }, 1000);
            })
            .catch(response => {
                let messages = [];
                if (response.status && response.error) messages.push(response.status + " " + response.error);
                if (response.message) messages.push(response.message);
            });
    }

    render() {
        let history = this.props.history;
        let currentUser = this.state.currentUser;
        let user = this.state.user;
        let totalScore = this.state.totalScore;
        let highScore = this.state.highScore;
        let scores = user.scores;
        let userIsAdmin = this.state.userIsAdmin;
        let messages = this.state.messages;

        return (
            <div className="container-custom">
                <div className="container-custom-inner">
                    <h3>
                        <strong>{user.username}</strong>
                    </h3>
                    <p>
                        <strong>ID: </strong>
                        {user.id}
                    </p>
                    <p><strong>Posljednja igra: </strong>{scores && scores.length === 0 ? "-----" : dateFormatLong.format(DateUtil.getLastScoreDate(scores))}</p>
                    <p><strong>Najveći rezultat: </strong>{highScore}</p>
                    <p>
                        <strong>Ukupni rezultat: </strong>{totalScore}
                    </p>
                    <p>
                        <strong>Broj igara: </strong>{scores && scores.length}
                    </p>
                    <p>
                        <strong>Prosjek: </strong>{scores && (scores.length === 0 ? "0" : Math.round(totalScore / scores.length * 100) / 100)}
                    </p>
                    {currentUser && currentUser.roles && currentUser.roles.includes("ADMIN") && !userIsAdmin &&
                        <button className="button-delete" style={{ backgroundImage: "url(/images/misc/trash_open.png)" }}
                        />}
                    {user && currentUser && currentUser.id != user.id &&
                        <button className="button-challenge" style={{ backgroundImage: "url(/images/misc/challenge.png)" }}
                            onClick={() => { this.props.onChallenge(user.username) }} />}
                </div>
                <div className="container-custom-second">
                    {user.scores && (user.scores.length > 0 &&
                        <div>
                            <ScoreList username={user.username} scores={user.scores} history={history}></ScoreList>
                        </div>)}
                </div>
            </div>
        );
    }
}