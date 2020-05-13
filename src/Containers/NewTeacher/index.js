import React from 'react';
import './styles.scss';
import{Button} from '../../Components'
import Subjects from '../Subjects';
import {connect} from 'react-redux';
import teachersActions from '../../Redux/Actions/teachersActions';
class NewTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            phone: "",
            delegationTeacherID: "",
            TeacherSubjectsList: [],
            mainSubjects: []
        };
        
    }

    onsubmit = (e) => {
        const {submitNewTeacher} = this.props
        const {image,firstName,middleName,lastName,email,phone,
            delegationTeacherID, TeacherSubjectsList} = this.state
        e.preventDefault();
        submitNewTeacher(image,firstName,middleName,lastName,email,phone, delegationTeacherID, TeacherSubjectsList);
     
        
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = (name === 'image') ? target.files[0] : target.value;
        this.setState({
            [name]: value
        })
    }

    TeacherSubjectsListOnChange = (subjectId, classId, mainSubject) =>{
        const {TeacherSubjectsList, mainSubjects} = this.state
        const subjIndex = this.checkForSubject(TeacherSubjectsList, subjectId);

        if(mainSubject === 1){
            if(mainSubjects.includes(subjectId)){
                mainSubjects.splice(mainSubjects.indexOf(subjectId), 1);
                if (subjIndex > -1){
                    TeacherSubjectsList[subjIndex]["isMainSubject"] = false;
                    if(TeacherSubjectsList[subjIndex]["classRoomIDs"].length === 0){
                        TeacherSubjectsList.splice(subjIndex, 1);
                    }
                } else {
                    const newSubArray = [];
                    newSubArray["subjectID"] = subjectId;
                    newSubArray["classRoomIDs"] = [];
                    newSubArray["isMainSubject"] = false;
                    TeacherSubjectsList.push(newSubArray)
                }  
                    } else {
                        mainSubjects.push(subjectId);
                        if (subjIndex > -1){
                            TeacherSubjectsList[subjIndex]["isMainSubject"] = true;
                        }   else {
                            const newSubArray = [];
                            newSubArray["subjectID"] = subjectId;
                            newSubArray["classRoomIDs"] = [];
                            newSubArray["isMainSubject"] = true;
                            TeacherSubjectsList.push(newSubArray)
                        }  
                    }
                    
        this.setState({mainSubjects: [...mainSubjects]});
        } else {

            if (subjIndex > -1){
              const classIndex = this.checkForClass(TeacherSubjectsList, subjIndex,classId);
              console.log(classIndex)
              if(classIndex > -1){
                TeacherSubjectsList[subjIndex]["classRoomIDs"].splice(classIndex, 1);
                if(TeacherSubjectsList[subjIndex]["classRoomIDs"].length === 0 && TeacherSubjectsList[subjIndex]["isMainSubject"] === false){
                    TeacherSubjectsList.splice(subjIndex, 1);
                }
              }else{
                TeacherSubjectsList[subjIndex]["classRoomIDs"].push(classId);
              }
            }else{
                const newSubArray = [];
                newSubArray["subjectID"] = subjectId;
                newSubArray["classRoomIDs"] = [classId];
                if(mainSubjects.includes(subjectId)){
                    newSubArray["isMainSubject"] = true;
                }else{
                    newSubArray["isMainSubject"] = false;
                }
                TeacherSubjectsList.push(newSubArray)
            }
        }
        this.setState({TeacherSubjectsList: [...TeacherSubjectsList]});
    }
    

    checkForSubject = (TeacherSubjectsList, subjectId) => {
        for(let i = 0 ; i < TeacherSubjectsList.length ; i += 1){
            if(TeacherSubjectsList[i]["subjectID"] === subjectId){
                return i;
            }
        }
        return -1;
    }
    
    checkForClass = (TeacherSubjectsList, subjIndex, classId) => {
        const classes = TeacherSubjectsList[subjIndex]["classRoomIDs"];
        for(let j = 0 ; j < classes.length ; j += 1){
            if(classes[j] === classId){
                return j;
            }
        
    }
    return -1;
}
    componentDidUpdate(prevProps){
        const {success} = this.props;
        //console.log(this.fileInput.current.files[0])
        if(success && prevProps.success !== true){
            this.setState({image: null,
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                phone: "",
                delegationTeacherID: "",
                TeacherSubjectsList: [],
                mainSubjects: []})
                this.fileRef.value = "";
        }
       
    }

    render() {
        const {TeacherSubjectsList,firstName,middleName,lastName,email,phone,delegationTeacherID} = this.state
        const {fetching, success} = this.props
        return(
            <div className="NewTeacherContainer">
                <h3>New Teacher</h3>
                <form onSubmit={(event)=>this.onsubmit(event)}>
            
                    <div className="row">
                        <div className="col">
                            
                            <input className="custom-file-input" onChange={(event) => this.onChange(event)} type="file"  name="image" ref={ref=> this.fileRef = ref}/>
                        </div>
                        <div className="col">
                            <input onChange={(event) => this.onChange(event)} placeholder="First Name" name="firstName" value={firstName}/>
                        </div>
                        <div className="col"> 
                        <input onChange={(event) => this.onChange(event)} placeholder="Middle Name" name="middleName" value={middleName}/>
                        </div>
                        <div className="col">
                        <input onChange={(event) => this.onChange(event)} placeholder="Last Name" name="lastName" value={lastName}/></div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input onChange={(event) => this.onChange(event)} placeholder="Email" name="email" value={email}/>
                        </div>
                        <div className="col">
                            <input onChange={(event) => this.onChange(event)} placeholder="Phone" name="phone" value={phone}/>
                        </div>
                        <div className="col">
                            <input onChange={(event) => this.onChange(event)} placeholder="Delegation Teacher" name="delegationTeacherID" value={delegationTeacherID}/>
                        </div>
                    </div>
                    <div className="Subjects">
                        <Subjects teachersSuccess={success}  TeacherSubjectsListOnChange={(subjectId, classId, mainSubject)=>this.TeacherSubjectsListOnChange(subjectId, classId, mainSubject)} 
                        TeacherSubjectsList={TeacherSubjectsList}/>
                    </div>
                    <div className="row">
                        <Button fetching={fetching} type="submit" className="button" value="Save" />
                    </div>
                </form>
                
            </div>
        );
    }
}

const mapStateToProps = ({teachers}) => {
    return {
      failure: teachers.failure,
      success: teachers.success,
      fetching: teachers.fetching
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      submitNewTeacher: (image, firstName, middleName, lastName, email, phone, delegationTeacher,TeacherSubjectsList) =>
        dispatch(teachersActions.teachersSubmitRequest(image, firstName, middleName, lastName, email, phone, delegationTeacher,TeacherSubjectsList)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NewTeacher);