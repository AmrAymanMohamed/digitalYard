import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
      const {fetching, value, iconClassName, ...props} = this.props;
      if(fetching){
        return(
            <FontAwesomeIcon className={iconClassName} icon="spinner" spin />
            );
      }else{
        return(
            <button {...props}>{value}</button>  
            );
      }

    }
}