import { Formik} from 'formik';
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import { uservalidate } from './uservalidate';
import './Login.css';
import { setName, setPassword, setRole, userinfo } from '../../redux/slices/userSlice';
import { setClientName } from '../../redux/slices/clientSlicer';

export const Login = () => {
  const loginuser = useSelector(userinfo)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()

    if ( loginuser.payload.user.role === 'therapist') {
      navigate('/therapist')
    }
    else{
      dispatch(setClientName(loginuser.payload.user.username))
      navigate('/client')
    }
  }

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <Formik
        enableReinitialize={true}
        validationSchema={uservalidate}
        initialValues={{ username: loginuser.payload.user.username,
                          password: loginuser.payload.user.password,
                          role: loginuser.payload.user.role }}
      >
      {({
        isSubmitting,
        handleChange,
        values,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group md="4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={(e) =>{
                handleChange(e)
                dispatch(setName(e.target.value))
              }}
              isInvalid={!!errors.username}
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={(e) =>{
                handleChange(e)
                dispatch(setPassword(e.target.value))
              }}
              isInvalid={!!errors.password}
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
          <span> Select User Role</span>
            <Form.Check
              type="radio"
              id="role"
              name="role"
              value={values.role}
              label="client"
              onChange={() => {
                dispatch(setRole("client"))}}
            />
            <Form.Check
              type="radio"
              name="role"
              id="role"
              value={values.role}
              label="therapist"
              onChange={() => {
                dispatch(setRole("therapist"))}}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            {errors.role}
          </Form.Control.Feedback>
          <Button type="submit" variant='primary' disabled={isSubmitting}>Login</Button>
        </Form>
      )}
      </Formik>
    </div>
  );
}
