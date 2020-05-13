import React from 'react';
import './styles.scss';
import NewTeacher from '../../Containers/NewTeacher';
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidUpdate(){
    }

    submit = (e) => {
      e.preventDefault();
      this.login();
    }
    showNewTeachers = () => {}
    render() {
      const roles = localStorage.getItem("userRoles");
      const isAdmin = roles.toUpperCase().includes("ADMIN");
        return(
            <div className="HomeContainer" >
              <h4>Hi {localStorage.getItem("userName")},</h4>
              {isAdmin && <NewTeacher />}
                
            </div>
        );
    }
}
