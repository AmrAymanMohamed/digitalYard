import React from 'react';
import './styles.scss';
import {Button} from '../../Components';
import {connect} from 'react-redux';
import notificationActions from '../../Redux/Actions/notificationActions';
class AlertView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    close = () => {
        const{NotifyDown} = this.props;
        NotifyDown();
    }
    render() {
        const {visable, dataArray, type} = this.props
        const classNames = ["AlertContainer"]
        if(dataArray.length === 0){
            return <div/>
        }
        if(type === 'error'){
            classNames.push("AlertError");
        } else if(type === 'success') {
            classNames.push("AlertSuccess");
        }
        if(visable){
            return(
                <div className={classNames.toString().replace(',',' ')} >
                    <Button className="closeNotbtn" value="X" onClick={()=>this.close()}/>
                    <ul>
                    {
                        dataArray.map((value, index)=><li key={index}>{value}</li>)
                    }
                    </ul>
                </div>
                );
        }
        return(<div></div>);
       
    }
}
const mapStateToProps = ({notifications}) => {
    return {
        visable: notifications.visable,
        dataArray: notifications.data,
        type: notifications.type
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      NotifyDown: () =>
        dispatch(notificationActions.notificationFailure()),
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AlertView);