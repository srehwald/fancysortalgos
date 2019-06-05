import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faReact } from "@fortawesome/free-brands-svg-icons";

export class Footer extends React.Component {
    render() {
        return (
            <div className="footer has-text-centered is-size-7 has-text-grey">
                <div>
                    Made with <FontAwesomeIcon icon={faHeart} />&nbsp;
                    by <FontAwesomeIcon icon={faGithub} />&nbsp;<a href="https://github.com/srehwald">srehwald</a>
                </div>
                <div>
                    using <FontAwesomeIcon icon={faReact} />&nbsp;
                    <a href="https://reactjs.org">React</a>, <a href="https://bulma.io">Bulma</a> and <a href="https://www.chartjs.org">Chart.js</a>
                </div>
            </div>
        )
    }
}