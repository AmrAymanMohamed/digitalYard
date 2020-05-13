import React from 'react';
import "./styles.scss";
export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {name, children, active,...props} = this.props
        return (
            <div className={active ? "activeButton" : "CardContainer"} {...props}>
                <div className="CardHeader"><h4>{name}</h4></div>
                <div className="CardDetails">
                    {children}
                </div>
            </div>
        );
    }
}