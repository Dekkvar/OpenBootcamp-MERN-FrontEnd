import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';

import { register } from '../../services/authService';

// Define Schema of validation with Yup
const registerSchema = Yup.object().shape(
  {
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid Email Format').required('Email is required'),
    password: Yup.string().min(8, 'Password too short').required('Password is required'),
    confirm: Yup.string().when('password', {
      is: (value: string) => (value && value.length > 0 ? true : false), 
      then: Yup.string().oneOf(
        [Yup.ref('password')], 'Passwords must match'
      )
    }).required('You must confirm your password'),
    age: Yup.number().min(10, 'Age must be over 10 years old').required('Age is required')
  }
);

// Register Component
const RegisterForm = () => {
  
  // We define the initial credentials
  const initialCredentials = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    age: 18
  }
  
  return (
    <div>
      <h4>Register Form</h4>
      {/* Formik to encapsulate a Form */}
      <Formik
        initialValues={initialCredentials}
        validationSchema={registerSchema}
        onSubmit={ async(values) => {
          register(values.name, values.email, values.password, values.age).then((response: AxiosResponse) => {
            if (response.status === 200) {
              console.log('User register correctly');
              console.log(response.data);
              alert('User registered correctly');
            } else {
              throw new Error('Error in registry');
            }
          }).catch((error)=> console.error(`[REGISTER ERROR]: Something went wrong: ${error}`))
        }}
      >
        {
          ({values, touched, errors, isSubmitting, handleChange, handleBlur, }) => (
            <Form>
              {/* Name */}
              <label htmlFor='name'>Name</label>
              <Field id='name' type='text' name='name' placeholder='Enter your Name' />

              {/* Name Errors */}
              {
                errors.name && touched.name && (
                  <ErrorMessage name='name' component='div'></ErrorMessage>
                )
              }

              {/* Age */}
              <label htmlFor='age'>Age</label>
              <Field id='age' type='number' name='age' />

              {/* Age Errors */}
              {
                errors.age && touched.age && (
                  <ErrorMessage name='age' component='div'></ErrorMessage>
                )
              }

              {/* Email */}
              <label htmlFor='email'>Email</label>
              <Field id='email' type='email' name='email' placeholder='example@email.com' />

              {/* Email Errors */}
              {
                errors.email && touched.email && (
                  <ErrorMessage name='email' component='div'></ErrorMessage>
                )
              }

              {/* Password */}
              <label htmlFor='password'>Password</label>
              <Field id='password' type='password' name='password' placeholder='Password' />

              {/* Password Errors */}
              {
                errors.password && touched.password && (
                  <ErrorMessage name='password' component='div'></ErrorMessage>
                )
              }

              {/* Confirm Password */}
              <label htmlFor='confirm'>Confirm Password</label>
              <Field id='confirm' type='password' name='confirm' placeholder='Confirm your password' />

              {/* Confirm Password Errors */}
              {
                errors.confirm && touched.confirm && (
                  <ErrorMessage name='confirm' component='div'></ErrorMessage>
                )
              }

              {/* Submit */}
              <button type='submit'>Register</button>

              {/* Message if the form is submitting */}
              {
                isSubmitting ? 
                  (<p>Sending data to registry...</p>) 
                  : null
              }
            </Form>
          )
        }

      </Formik>
    </div>
  )
}

export default RegisterForm;