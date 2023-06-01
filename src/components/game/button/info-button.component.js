import React, { Component } from "react";
import "../../../constants/colors.css";
import "./button.css";

export default class InfoButton extends Component {

    constructor() {
        super();
        this.state = {
        }
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let messages = this.state.messages;
        return (
            <div className="form-button info bg-lightpink" onClick={this.handleClick} style={{ backgroundImage: 'url(../images/misc/info.png)' }}>
            </div>
        )
    }

    handleClick() {
        let a = [" Bacanjem kockica postižu se određeni rezultati koji se upisuju u obrazac. Na kraju igre postignuti se rezultati zbrajaju.",
            " Nakon prvog bacanja, igrač gleda u obrazac i odlučuje hoće li nešto odmah upisati ili će igrati dalje." +
            " U jednom potezu igrač može kockice (sve ili samo one koje izabere) bacati tri puta.",
            " Prvi stupac obrasca upisuje se odozgo prema dolje, a drugi obrnuto. U treći stupac rezultati se upisuju bez određenog redoslijeda.",
            " Četvrti stupac mora se popunjavati tako da se nakon prvog bacanja najavljuje igra za određeni rezultat.",
            " Igrač je obavezan u to polje upisati ostvareni rezultat bez obzira da li mu to nakon tri bacanja odgovara ili ne.",
            " Rezultat se može, ali ne mora upisati u četvrti stupac nakon prvog bacanja."];
    }
}
