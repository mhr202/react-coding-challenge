import * as yup from 'yup'

export const uservalidate = (
   yup.object().shape({
    username: yup.string().required("Enter Valid name").min(4).max(30),
    password: yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    role: yup.string().required().oneOf(['client' , 'therapist']),
  })
)