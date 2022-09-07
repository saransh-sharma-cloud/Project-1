import { Avatar, Box, Grid,  IconButton,  List,  listClasses,  ListItem,  ListItemAvatar,  ListItemSecondaryAction,  ListItemText,  Paper, TextField, Typography,Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {makeStyles} from '@mui/styles'
// import { color } from '@mui/system';
import { green, indigo, red, grey } from '@mui/material/colors';
import DoneOutline from '@mui/icons-material/DoneOutline';
import DeleteForever from '@mui/icons-material/DeleteForever';
import ImageIcon from '@mui/icons-material/Image';
import { color } from '@mui/system';

const useStyles =makeStyles((theme) =>({
  container:{

    margin:theme.spacing(3,0,2,0),
    padding:theme.spacing(2)
  },
  formContainer:{
    padding:theme.spacing(2)
  },
  heading:{
    textAlign:'center',
    marginBottom:theme.spacing(3),
    color:indigo[500]
  },
  button:{
    marginRight:theme.spacing(1000)
  },
  secondColumn:{
    // margin:theme.spacing(4, 0, 3, 0),
    margin: '32px 0px 24px 0px',
    
  },
  ListContainer:{
    background:'white',
    padding:theme.spacing(2),
    // margin:theme.spacing(4, 0, 3, 0),
    minHeight:'300px',                                               //height of container
    height:'auto',                                                   
  },
  emptyMsg:{
    textAlign:'center',
    color:grey[400],
    marginTop:theme.spacing(3),
  },
  ListContainerTitle:{
    padding:theme.spacing(2),
    color:indigo[500],
  },
  remainTaskAvatar:{
    // backgroundColor: indigo['A400'],
    color:'inherit',
  },
}));




export default function MyForm() {
  
  const classes  = useStyles();

  
  const[inputData,setInputData] = useState();
  const[inputError,setInputError] = useState();

  const[remainingTaskList, setRemainingTaskList] = useState([]);

      useEffect(()=> {
        fetch('http://localhost:3000/remaining-task')
        .then(res => res.json())
.then((data) =>{
  console.log('data' , data)
   setRemainingTaskList(data)
},[]);

fetch('http://localhost:3000/completed-task')
.then(res => res.json())
.then((data) =>{
console.log('data' , data)
setCompletedTaskList(data)
});

},[])

  const[completedTaskList, setCompletedTaskList] = useState([]);
  
  
  const handleSubmit =(e) => {
    e.preventDefault();
    console.log('Form Submitted')
    if(inputData.length > 5 && inputData !== ""){
          const taskList = {
            id:Math.random(),
            title:inputData,
          };
          const list = [...remainingTaskList]                  
          list.push(taskList)

          setRemainingTaskList(list);                     //updating the task list
          setInputData("")
        
      
          fetch('http://localhost:3000/remaining-task', {        
  method:'POST',
  body:JSON.stringify({
    title:inputData,
    userID:1,
    id:taskList.id
  }),
headers: {

    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
})
.then(res => res.json())
.then(data => console.log(data));
  }
  };



  const handleOnChange=({target})=> {

target.value.length <= 5
? setInputError('Take atleast 5 character')
: setInputError("");
setInputData(target.value);

};
  
           const handleCheck = (id) => {
            const intial =[...remainingTaskList];
            const intialCompleteTask = [...completedTaskList];
            const currentTime = getCurrentTime(new Date())
            
            const Index = intial.findIndex((item)=> item.id === id)
            remainingTaskList[Index].currentTime  = currentTime;                    //current Time
            intialCompleteTask.push(remainingTaskList[Index]);
          
            

            const updatedRemainingTask = intial.filter((item)=> item.id !== id)          //deleting item for remaining
            console.log('delete id',id);
            console.log('remaining task',remainingTaskList[Index])

            let obj = {...remainingTaskList[Index]};
            delete obj.id;

            fetch('http://localhost:3000/remaining-task/'+id, {
              method:'DELETE',
          })
            fetch('http://localhost:3000/completed-task/',{
              method:'POST',
              body:JSON.stringify(obj),
              headers: {

                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
            })
            
            setRemainingTaskList(updatedRemainingTask);        //update the complete task state
            setCompletedTaskList(intialCompleteTask);

         
       
           };


           const handleDelete = (id) =>  {
            const intial =[...remainingTaskList]
            const updated = intial.filter((item)=> item.id !== id)
            setRemainingTaskList(updated); 
            console.log('delete id',id);
            fetch('http://localhost:3000/remaining-task/'+id, {
              method:'DELETE',
          })
        
          }; 
  
  
    const getCurrentTime = (date = new Date()) => {
      let hour = date.getHours()
      let minutes = date.getMinutes()
      let amPm = hour >=12 ? 'pm':'am';

      hour = hour % 12;
      hour = hour ? hour : 12                    
      minutes = minutes <10 ? '0' + minutes:minutes
      let currentTime = hour +':'+minutes+amPm
      return currentTime
    }
  
           
   
                
    
 
            

  return (
<Box className={classes.container} >
      <Grid container sx ={{m:24,mt:10,ml:16}}
      maxWidth='1540px'>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <Typography variant='h5' className={classes.heading} sx={{mb:4}}>
                {" "}
                React Todo List App
              </Typography>
              <Grid container justify='center'>

                <Grid item xs={8}>

                  <TextField
                    id='inputTaskField'
                    label='Press Enter To Add A Task'
                    variant='outlined'
                    fullWidth={true}
                    size='small'
                    sx = {{textAlign: 'center'}}
                    value={inputData}
                    onChange={handleOnChange}
                    error={inputError ? true : false}
                    helperText={inputError}
                    />
                  </Grid>
                 <Button type ='Submit' className={classes.button} color ='primary' variant='contained'>SEND</Button>
              </Grid>
            </form>
          </Paper>
        </Grid>





                               {/* Task grid container */}



        <Grid item xs= {12} >
        <Grid container spacing={12} className={classes.secondColumn} sx ={{ml:-12, mt:-6}}>
          <Grid item xs={12} sm={6} lg={6}>
          <List className={classes.ListContainer} dense={true}>
            <Typography className={classes.ListContainerTitle} variant='h5'>
              Remaining Task
            </Typography>
            {
             remainingTaskList.length > 0 ? (
               remainingTaskList.map((item,i)=> (
              <ListItem key ={i}>
              <ListItemAvatar>
                <Avatar className={classes.remainTaskAvatar} sx={{backgroundColor:indigo['A400'], color:'white'}}>
                  {item.title[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.title} />
              <ListItemSecondaryAction>
                <IconButton 
                style ={{color:green[500]}} 
                onClick={() =>handleCheck(item.id)}>
                <DoneOutline/>
                </IconButton>
                <IconButton 
                style ={{color:red[500]}} 
                onClick={() =>handleDelete(item.id)}>
                <DeleteForever/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
              ))
            ) : (
            <Typography className={classes.emptyMsg}>
              No Task added yet !....
            </Typography>  
          )}
      </List>

</Grid>
       


<Grid item xs={12} sm={6} lg={6}>
          <List className={classes.ListContainer} dense={true}>
            <Typography className={classes.ListContainerTitle} variant='h5'>
              Completed Task
            </Typography>
            {
              completedTaskList.length > 0 ? (
              completedTaskList.map((item,i) => (
              <ListItem key ={i}>
              <ListItemAvatar>
                <Avatar className={classes.completeTaskAvatar} sx={{backgroundColor:green[600], color:'white'}}>
                  {item.title[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
              primary={item.title} 
              secondary={item.currentTime} />
               
               
              
            </ListItem>
            ))
            ) : (
            <Typography className={classes.emptyMsg}>
              No Task added yet !....
            </Typography>  
          )}
      </List>
</Grid>
                 
        </Grid>
        </Grid>
        </Grid>
    </Box>
  );
        }