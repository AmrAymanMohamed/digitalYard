import React from 'react';
import './styles.scss';
import {connect} from 'react-redux';
import subjectsActions from '../../Redux/Actions/subjectsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button} from '../../Components'
import Classes from '../Classes'
class Subjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classesVisStates:[],
            mainSubjects: []
        };
    }
    
    getSubjects = () => {
        const {getSubjects} = this.props
        getSubjects()
    }

    componentDidMount(){
        this.getSubjects();
    }
    componentDidUpdate(prevProps){
        const {teachersSuccess} = this.props;
        if(teachersSuccess && prevProps.teachersSuccess !== teachersSuccess){
           this.setState({classesVisStates:[],
            mainSubjects: []})
        }
    }
    checkMainSubject = (subjectId) => {
        const {TeacherSubjectsListOnChange} = this.props;
        TeacherSubjectsListOnChange(subjectId,null,1);
    }
    isChecked = (subjectId) => {
        const {TeacherSubjectsList} = this.props;
        for(let i = 0 ; i < TeacherSubjectsList.length ; i+=1){
            if(TeacherSubjectsList[i]["subjectID"] === subjectId){
                return TeacherSubjectsList[i]["isMainSubject"];
            }
        }
        return false
    }
    toggleClasses = (subjectId) => {
        const {classesVisStates} = this.state;
        if(classesVisStates.includes(subjectId)){
            classesVisStates.splice(classesVisStates.indexOf(subjectId), 1);
        } else {
            classesVisStates.push(subjectId);
        }
        this.setState({classesVisStates: [...classesVisStates]});
        
    }
    render() {
        const {subjectsData, TeacherSubjectsListOnChange, TeacherSubjectsList, teachersSuccess} = this.props
        const {classesVisStates} = this.state
        let AllSubjects = []
        if(subjectsData !== 'undefined' && typeof subjectsData !== 'undefined' && subjectsData !== null){
            AllSubjects = subjectsData;
        }
 
        return(
           <div className="SubjectsContainer">
               <h3 className="title">Subjects</h3>
               
                   {
                       AllSubjects.map((value, index)=>{
                           return(
                            <div key={value.id} className="Subject">
                            <div  className="SubjectName">
                            <Button type="button" className="hideBtn" onClick={()=>this.toggleClasses(value.id)}
                            value={<h4>{value.name}<span className="dropIcon"><FontAwesomeIcon  icon="angle-down" /></span></h4>} />
                            <input type="checkbox" checked={this.isChecked(value.id)} onChange={()=>this.checkMainSubject(value.id)}/>
                            <label>Is Main Subject</label>
                            </div>
                            <div className="classes">
                                <Classes teachersSuccess={teachersSuccess} visable={classesVisStates.includes(value.id)} subjectId = {value.id} TeacherSubjectsListOnChange = {TeacherSubjectsListOnChange} TeacherSubjectsList={TeacherSubjectsList}/>
                            </div>
                            </div> 
                           );
                       })
                   } 
                    
                   
           </div>
        );
    }
}

const mapStateToProps = ({subjects}) => {
    return {
        subjectsFailure: subjects.failure,
        subjectsSuccess: subjects.success,
        subjectsFetching: subjects.fetching,
        subjectsData: subjects.data
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      getSubjects: () =>
        dispatch(subjectsActions.subjectsRequest()),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Subjects);