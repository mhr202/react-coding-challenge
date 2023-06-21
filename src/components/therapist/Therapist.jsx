import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import { DisplayQuestions } from '../displayQuestions/DisplayQuestions';
import { AddQuestion } from '../addquestions/AddQuestions';
import './Therapist.css';

export const Therapist = () => {
  const [flag, setFlag] = useState(false);

  const handleClick =() => {
    setFlag(!flag)
  }

  return (
    <div id='therapist-dashboard'>
      <h1>All Questions</h1>
      <div>
        < DisplayQuestions/>
      </div>
      <Button type="submit" variant='primary' onClick={handleClick} className='add-question-btn'>Add Question</Button>
      {flag && <AddQuestion setFlag={setFlag}/>}
    </div>
  );
}
