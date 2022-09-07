import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import Form from './components/MyForm';
import { createTheme, ThemeProvider } from '@mui/material';
import './index.css';
import Header from './components/Header';
import Logins from './components/Logins';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MyForm from './components/MyForm';
import { useSelector } from 'react-redux';
const theme = createTheme();
function App() {
    
  return (
 <>
  <Router>
 <Header/>
 <Routes>
  <Route exact path='/home' element = {
 <ThemeProvider theme={theme}>
 <Form/>
 </ThemeProvider>}
 >
 </Route>
 <Route exact path='/login' element={<Logins />}></Route>
 <Route exact path='/signup' element={<SignUp />}></Route>

 </Routes>
 </Router>
       
 </>
  );
}

export default App;
