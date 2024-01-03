import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { 
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid, 
  Paper, 
  Radio, 
  RadioGroup,
  TextField,
  Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import { display } from '@mui/system'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
// import { Button } from 'react-bootstrap'
import * as Yup from 'yup'
// import { Button, FormControl } from 'react-bootstrap'

const SignUp = () => {

const paperStyle = {padding:20,  width:300,  margin:'0 auto'}
const headerStyle = {margin:0}
const avatarStyle = {backgroundColor:'#1bbd7e'}
const marginTop = {marginTop :5}






const initialValues = {
    name: '',
    email:'',
    gender:'',
    phoneNumber:'',
    password:'',
    confirmPassword:'',
    termsAndConditions: false

}


  const validationSchema = Yup.object().shape({
    name:Yup.string().min(3,"It's too short").required('Requried'),
    email:Yup.string().email("Enter valid email").required('Requried'),
    gender:Yup.string().oneOf(['male','female'],'Required').required('Required'),
    phoneNumber:Yup.number().typeError('Enter valid Phone Number').required('Required'),
    password:Yup.string().min(8,'Password minimum length should be').required('Required'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password')],'Password not matched').required('Required'),
    termsAndConditions:Yup.string().oneOf(['true'],'Accept terms and conditions')




  })

        

  const onSubmit = (values,props) =>{
    console.log(values)
    console.log(props)
    setTimeout(()=>{
        
        props.resetForm()
        props.setSubmitting(false)
    } ,2000)
           let obj = values
    fetch('http://localhost:3000/users', {        
      method:'POST',
      body:JSON.stringify(obj),
    headers: {
    
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }


  return (
    <Grid  sx = {{marginTop :'250px'}}>
        <Paper  style={paperStyle} >
            <Grid align ='center' >
                <Avatar elevation = {avatarStyle} style={{ color: green[500] }}>
                    <AddCircleOutlineOutlined/>
                </Avatar>
                <h2 style ={headerStyle}>Sign Up</h2>
                <Typography variant ='caption' gutterBottom>Please fill this form to create an account !</Typography>

            </Grid>

         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
           {(props)=>(

           <Form  >

          <Field as ={TextField} fullWidth name ='name' label='Name'
          placeholder="Enter your name" helperText={<ErrorMessage name='name'/>}  />

           <Field as ={TextField} fullWidth name = 'email' label ='Email'
           placeholder='Enter your password' helperText = {<ErrorMessage name='password'/>} />

           <FormControl component ='fieldset' style={marginTop}>
            <FormLabel component='legend'>Gender</FormLabel> 

            <Field as={RadioGroup} aria-label ='gender' name ='gender' style={{display:'initial'}}>
            <FormControlLabel value ='female' control={<Radio/>} label ='Female'/>
            <FormControlLabel value ='male'   control={<Radio/>} label='Male'/>  
        
                </Field>

           </FormControl>

           <FormHelperText><ErrorMessage name='gender'/></FormHelperText>
           <Field as ={TextField} fullWidth name ='phoneNumber' label ='Phone Number'
           placeholder ='Enter your phone number' helperText={<ErrorMessage name ='phone number' />} />

           <Field as ={TextField} fullWidth name = 'password' type='password'
            label = 'Password' placeholder = 'Enter your password'
           helperText={<ErrorMessage name='password' />}  />

           <Field as = {TextField} fullWidth name = 'confirmPassword' type='password'
           label = 'Confirm Password' placeholder = 'Enter your confirm password'
           helperText={<ErrorMessage name='confirmPassword' />}  />


           <FormControlLabel
          control={<Field as = {Checkbox} name ='termsAndConditions' />}
          label = 'I accept the Terms and Conditions'
          />           


        <FormHelperText><ErrorMessage name='termAndConditions'/></FormHelperText>
<Button type ='submit ' variant='contained' disabled ={props.isSubmitting}
    color ='primary'>{props.isSubmitting ? 'Loading' :'Sign Up'}</Button>

            </Form>
           )}
</Formik>


        </Paper>
    </Grid>
    
  )
}


export default SignUp
