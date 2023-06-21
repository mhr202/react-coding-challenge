import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from "react-bootstrap";
import { Modaal } from '../Modaal';
import { userinfo } from '../../redux/slices/userSlice';
import {getQuestions, removeQuestion } from '../../redux/slices/questionSlicer';
import './DisplayQuestions.css';
import { getResolvedQuestionnaire } from '../../redux/slices/resolvedQuestionnaireSlice';
import { getClientList } from '../../redux/slices/clientSlicer';

export const DisplayQuestions = () => {
  const getquestions = useSelector(getQuestions)
  const currentuser = useSelector(userinfo)
  const {role} = currentuser.payload.user
  const { questionsList } = getquestions.payload.questions
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(getquestions[0])
  const questionnaireList = useSelector(getResolvedQuestionnaire)
  const {questionnaire} = questionnaireList.payload.resolvedQuestionnaire
  const List = useSelector(getClientList)
  const {name} = List.payload.clientList
  const [clientQuestion, setClientQuestion]= useState()
  const [showClientQuestion,setShowClientQuestion] = useState(false)
  const [selectedClient, setSelectedClient] = useState("Select Client")

  const handleShow = (event, question) => {
    event.preventDefault()
    setShow(true);
    setCurrentQuestion(question)
  }
  const handleDeleteClick = (event, id) => {
    event.preventDefault()
    dispatch(removeQuestion(id))
  }

  const handleDropDown = (event,item) => {
    event.preventDefault()
    const array = questionnaire.filter(list => list.clientName === item)
    setSelectedClient(item)
    setClientQuestion([...array])
    setShowClientQuestion(true)
  }

  const handlefunc = () => {
    setShowClientQuestion(false)
    setSelectedClient("All Questions")
  }
  
  return (
    <>
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      {selectedClient}
    </Dropdown.Toggle>
    <Dropdown.Menu>
    <Dropdown.Item href="#" onClick={() => handlefunc()}>All Questions</Dropdown.Item>
      {name.length === 0 ?  <Dropdown.Header>No Record Found</Dropdown.Header>:
         name.map((item,index) => (
          <Dropdown.Item href="#" onClick={(e) => handleDropDown(e,item)} id={index}>{item}</Dropdown.Item>
        ))
      }
    </Dropdown.Menu>
  </Dropdown>
    <div id="question">
       {questionsList.length <= 0  && <div className='default'>No Questions found</div>}
      <ol>
        {questionsList.length > 0 && questionsList.map((question) => (
          <li key={question.id.toString()}>
            Q: {question.statement}
            {showClientQuestion && <p>A:{(clientQuestion.filter(answer=> answer.questionId === question.id))[0]?.answer}</p>}
            {role==='therapist' && showClientQuestion == false &&
              <span>
                <a href="#" onClick={(e)=>handleShow(e, question)}><FontAwesomeIcon icon={ faPenToSquare } className='icon'/></a>
                <a href="#" onClick={(event) => handleDeleteClick(event, question.id)}><FontAwesomeIcon icon={ faTrash } className='icon'/></a>
                {show && <Modaal question={currentQuestion} show={show} SetShow={setShow}/> }
              </span>
            }
          </li> 
        ))}
      </ol>
    </div>
   
    </>
  );
}
