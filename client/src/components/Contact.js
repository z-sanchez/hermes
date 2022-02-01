import React from "react";
import Darth from "../images/darth.jpg";

//get user data and push to state
//active or not
//mount contact image
//get last text

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        document.getElementById('darthContact').style.backgroundImage = `url( ${Darth} )`;
    }


    render() {
        return (
            <div className="contact contact--active">
                <div className="contact__activeBar--lit"/>
                <div className="contactImage--border" id="darthContact">
                </div>
                <div className="contact__text">
                    <h1>Darth Vader</h1>
                    <p>
                        Thanks for having me man!Thanks for having me man! Thanks for having
                        me man! Thanks for having me man! Thanks for having me man!{" "}
                    </p>
                </div>
            </div>

        );
    }
}

export default Contact;
