import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import React from 'react'
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useState } from 'react';
import { Link } from 'react-router-dom';



const Header = () => {

const[value,setValue] = useState();


  return (
    <React.Fragment>
      <AppBar sx={{background:'#063970'  }}>
        <Toolbar>


  <SummarizeIcon /> 
  
  <Tabs textColor = 'inherit' value = {value} 
  onChange={(e,value)=> setValue(value)} indicatorColor='secondary'>
  <Tab label = 'Home' sx={{color:'#FFFFFF'}} />
  <Tab label = 'Products' sx={{color:'#FFFFFF'}} />
  <Tab label = 'Contact Us' sx={{color:'#FFFFFF'}} />
  </Tabs>
  

<span style={{marginLeft : 'auto'}}>
  
  <Link to='/login' ><Button  variant='contained'> Login{' '}</Button> </Link>

  <Link to='/signup' > <Button sx = {{marginLeft : '10px'}}variant='contained'> SignUp{" "}</Button> </Link>
  </span>
        </Toolbar>
    
      </AppBar>
    </React.Fragment>
  )
}

export default Header