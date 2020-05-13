import React from 'react';
import {connect} from 'react-redux';
import classesActions from '../../Redux/Actions/classesActions';
import {Card} from '../../Components'
class Classes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        const {subjectId, getClasses} = this.props;
        if(subjectId !== null && subjectId !== 'undefined' && typeof subjectId !== 'undefined'){
            getClasses(subjectId);
        }
    }
    addClassAndSubjects = (subjectId, classId) => {
        const {TeacherSubjectsListOnChange} = this.props
        TeacherSubjectsListOnChange(subjectId, classId);
    }
    
    cardisActive = (subjectId, classId) => {
        const{TeacherSubjectsList} = this.props
        for(let i = 0 ; i < TeacherSubjectsList.length ; i+=1){
            const TeacherSubject = TeacherSubjectsList[i];
            if(subjectId === TeacherSubject["subjectID"] && TeacherSubject["classRoomIDs"].includes(classId)){
                return true;
            }
        }
        
        return false;
    }

    render() {
        const {visable, classesData, subjectId} = this.props;
        if (visable){
            return(
            <div>{classesData.map((value, index)=>{
                const {data} = value;
                const subjId = value.subjectId;
                if(subjectId === subjId){
                    return data.map((v,i)=>{
                        return(<Card active={this.cardisActive(subjectId, v.id)} onClick={()=>this.addClassAndSubjects(subjectId, v.id)} key={v.id} name={v.name} > <span className="bold">Grade:</span> {v.grade} </Card>)
                    })
                }
                return null;
            })}</div>
            );
        }
        return(
            <div></div>
        )
        
    } 
}
const mapStateToProps = ({classes}) => {
    return {
        classesFailure: classes.failure,
        classesSuccess: classes.success,
        classesFetching: classes.fetching,
        classesData: classes.data
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      getClasses: (subjectId) =>
        dispatch(classesActions.classesRequest(subjectId)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Classes);