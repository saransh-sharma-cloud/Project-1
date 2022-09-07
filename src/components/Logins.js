import {  LockOutlined } from '@mui/icons-material'
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const Logins = ({handleChange}) => {
   
    const navigate = useNavigate()
    const paperStyle = { padding: 20, width: 300, margin: '20px auto' }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    
    const initialValues = {
        username:'',
        password:'',
        remember:false
    }
    const validationSchema = Yup.object().shape({
        username:Yup.string().email('please enter your valid email').required('Required'),
        password:Yup.string().required("Required")
    })
                           


                  


             const onSubmit = (values, props) => {
                console.log(values)
                  console.log()
                setTimeout(() => {
                    props.resetForm()
                    props.setSubmitting(false)
                }, 2000)
                fetch('http://localhost:3000/users?email='+values.username)
  .then(res => res.json())
  .then(data =>{console.log(data)
           let userobj = data[0]
           console.log(userobj,'userobj')
           if(userobj.password == values.password){
            console.log('Login')
            localStorage.setItem("username", userobj.name);
            navigate('/home')
           }
           else{
            console.log('wrong password')
           }
});
           }
                    


    return (
        <Grid sx={{marginTop:'250px'}}>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlined /></Avatar>

                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

{(props) => (
    <Form>
        <Field as= {TextField}  label ='Username' name ='username'
        placeholder='Enter username'  fullWidth required
        helperText={<ErrorMessage name='username'/>}/>



<Field as= {TextField}  label ='Password' name ='password'
        placeholder='Enter password' type='password'  fullWidth required
        helperText={<ErrorMessage name='username'/>}/>


          <Field as ={FormControlLabel}
          name ='remember'
          control ={
            <Checkbox
            color='primary'
            />
}
label = 'Remember me'
/>
           <Button type = 'submit' color ='primary' variant='contained' disabled = {props.isSubmitting}
           style = {btnstyle} fullWidth>{props.isSubmitting ? 'Loading' : 'Sign in'}</Button>






    </Form>
)}

                </Formik>
               
                <Typography>
                    <Link href='#'>
                        Forgot Password?
                    </Link>
                </Typography>

                <Typography>Do you have an account ?

                    <Link href='/signup' onClick ={()=> handleChange('event',1)}>
                        Sign Up
                    </Link>


                </Typography>
            </Paper>
        </Grid>
    )
}

export default Logins 