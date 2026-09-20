import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Accueil from './pages/Accueil';
import TaskForm from './components/TaskForm';


const App = () => {
  //verification
  const ProtectedVerification = ({children}) => {
    const userId = localStorage.getItem("userId");
    if(!userId){
      alert("Veuillez-vous connecter pour accéder à cette page !");
      return <Navigate to= "/Login" replace />
    }
    return children;
  }
  return(
    <Router>
      <Routes>
        <Route path="/"  element={<Navigate to="/Login" replace/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Accueil" element={
          <ProtectedVerification>
            <Accueil/>
          </ProtectedVerification>
        }/>

        <Route path="/TaskForm" element={
          <ProtectedVerification>
            <TaskForm/>
          </ProtectedVerification>
        }/>
        <Route path="/TaskForm/:id" element={
          <ProtectedVerification>
            <TaskForm/>
          </ProtectedVerification>
        }/>
      </Routes>
    </Router>
  );
};
export default App;