import React from 'react';
import {connect} from 'react-redux';
import loginActions from '../../Redux/Actions/loginActions';
import './styles.scss';
import {Button} from '../../Components';
class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'shss@shscairo.edu.eg',
            password: 'Asd@1234'
        };
    }
    componentDidUpdate(){
      const{success, history} = this.props;
      if(success){
        history.replace('/home');
      }
    }
    login = () => {
        const {login} = this.props;
        const {username, password} = this.state;
        login(username, password);
      };

    submit = (e) => {
      e.preventDefault();
      this.login();
    }
    onChange = (e) => {
      let target = e.target;
      let name = target.name;
      let value = target.value;
      this.setState({
          [name]: value
      })
  }
    render() {
      const {username, password} = this.state;
      const {fetching} = this.props;
        return(
            <div className="AuthContainer" >
               <form onSubmit={(event)=>this.submit(event)}>
                  <input onChange={(event) => this.onChange(event)} value={username} name="username"/>
                  <input onChange={(event) => this.onChange(event)} value={password} type="password" name="password"/>
                  <Button iconClassName="loader" className="button" fetching={fetching} type="submit" value="Login" />
               </form>
            </div>
        );
    }
}

const mapStateToProps = ({login}) => {
    return {
      failure: login.failure,
      success: login.success,
      fetching: login.fetching,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      login: (username, password) =>
        dispatch(loginActions.loginRequest(username, password)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(loginScreen);