import { useState } from 'react';
import  { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateQuestion } from '../redux/slices/questionSlicer'
export const Modaal = ({question, show, SetShow}) => {

  const [editQuestion, setEditQuestion] = useState(question)
  const dispatch = useDispatch()
  const handleClose = () => SetShow(!show)
  const handleSave =() =>{
    debugger
    dispatch(updateQuestion({id: editQuestion.id, statement: editQuestion.statement}))
    SetShow(!show)
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              value = {editQuestion.statement}
              autoFocus
              onChange={(e) => setEditQuestion({...editQuestion, statement: e.target.value})}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => SetShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}