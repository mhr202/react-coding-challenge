import { useState } from 'react';
import { Container } from 'react-bootstrap';
import  { Button, Form } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';

import { addQuestions, getQuestions } from '../../redux/slices/questionSlicer';
import './AddQuestion.css'

export const AddQuestion = (props) => {
  const [statement, setStatement] = useState("")
  const dispatch = useDispatch()
  const getquestions = useSelector(getQuestions)
  const { questionsList } = getquestions.payload.questions

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(addQuestions({id:questionsList.length + 1, statement: statement }))
    props.setFlag(false)
  }

  return (
    <Container className='add-question-form'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Question</Form.Label>
          <Form.Control type="text" placeholder="Enter Question" name='statement' onChange={(e) => setStatement(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}