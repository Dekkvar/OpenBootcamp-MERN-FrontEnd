import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { register } from '../../services/authService';
import { AxiosResponse } from 'axios';

// Define Schema of validation with Yup
const registerSchema = Yup.object().shape(
  {
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid Email Format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    age: Yup.number().positive('Age has to be a positive number').integer('Age cant be a float number').required('Age is required')
  }
);

function validatePassword(values: any) {
  let error;
  if (values.password !== values.repeatPassword) {
    error = 'Invalid password'
  }
  return error
}

// Register Component
const RegisterForm = () => {
  
  // We define the initial credentials
  const initialCredentials = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
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
              if (response.data.token) {
                sessionStorage.setItem('sessionToken', response.data.token)
              } else {
                throw new Error('Error generating Login Token')
              }
            } else {
              throw new Error('Invalid credentials')
            }
          }).catch((error)=> console.error(`[LOGIN ERROR]: Something went wrong: ${error}`))
        }}
      >
        {
          ({values, touched, errors, isSubmitting, handleChange, handleBlur, }) => (
            <Form>
              {/* Name */}
              <label htmlFor='name'>Name</label>
              <Field id='name' type='name' name='name' placeholder='Enter your Name' />

              {/* Name Errors */}
              {
                errors.name && touched.name && (
                  <ErrorMessage name='name' component='div'></ErrorMessage>
                )
              }

              {/* Age */}
              <label htmlFor='age'>Age</label>
              <Field id='age' type='age' name='age' placeholder='Enter your age' />

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
              <Field id='password' type='password' name='password' placeholder='example' />

              {/* Password Errors */}
              {
                errors.password && touched.password && (
                  <ErrorMessage name='password' component='div'></ErrorMessage>
                )
              }

              {/* Confirm Password */}
              <label htmlFor='repeatPassword'>Confirm Password</label>
              <Field id='repeatPassword' type='password' name='repeatPassword' placeholder='Repeat password' />

              {/* Confirm Password Errors */}
              {
                errors.repeatPassword && touched.repeatPassword && (
                  <ErrorMessage name='repeatPassword' component='div'></ErrorMessage>
                )
              }

              {/* Submit */}
              <button type='submit'>Register</button>

              {/* Message if the form is submitting */}
              {
                isSubmitting ? 
                  (<p>Checking credentials...</p>) 
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