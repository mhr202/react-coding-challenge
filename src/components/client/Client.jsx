import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getQuestions } from '../../redux/slices/questionSlicer';
import { Form } from 'react-bootstrap';
import { setResolvedQuestionnaire } from '../../redux/slices/resolvedQuestionnaireSlice';
import { userinfo } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import './Client.css';

export const Client = () => {
  const dispatch = useDispatch()
  const getquestions = useSelector(getQuestions)
  const currentuser = useSelector(userinfo)
  const {username} = currentuser.payload.user
  const { questionsList } = getquestions.payload.questions
  const [activeIndex, setActiveIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const navigate = useNavigate()

  const handleClick =(id) => {
    dispatch(setResolvedQuestionnaire({clientName: username, answer: answer, questionId: id}))
    setAnswer("")
    if ( activeIndex+1 == questionsList.length ){
      navigate('/')
      alert('submitted')
    }
    setActiveIndex(activeIndex+1);
  }

  return (
    <div id='client-dashboard'>
      <Link to="/" className="btn btn-primary logout-btn">Logout</Link>
      <h1>Client Dashboard</h1>
    
        <span>Answer the following Questions</span>
        {activeIndex < questionsList.length && 
          <div className='client-question'>
            Q#{activeIndex+1}: {questionsList[activeIndex].statement}
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value = {answer}
                  autoFocus
                  placeholder='Type Answer here'
                  onChange={(e)=> setAnswer(e.target.value)}
                />
              </Form.Group>
            </Form>
          {activeIndex+1 < questionsList.length &&
            <Button onClick={() => handleClick(questionsList[activeIndex].id)} disabled={activeIndex+1 == questionsList.length}>Next</Button> }
          {activeIndex+1 === questionsList.length &&
            <Button onClick={() => handleClick(questionsList[activeIndex].id)}>Sumbit</Button> }
          </div>
        }
     
    </div>
  );
}
