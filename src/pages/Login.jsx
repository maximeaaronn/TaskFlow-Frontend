import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import '../css/register.css';

export default function Login () {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [asError, setAsError] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setUser('');


        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
               email,
               password
            });

            
            setAsError(false);
            setMessage(response.data.message);
            setUser(response.data.user.name);
            
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('userName', response.data.user.name);
            setTimeout(() => {
                navigate('/Accueil', {replace: true});
            }, 2000);


        }catch(error){
            setAsError(true);
            if(error.response && error.response.data){
                const errMsg = error.response.data.message || "Erreur lors de la connexion !";
                setMessage(errMsg);
            }else{
                setMessage("Impossible de se connecter au serveur !")
            };
        };
    }

    return(
        <section className="container-auth">
            <div className="container-card-auth">
               <h1>Bienvenue dans <em>TaskFlow</em></h1>
               <p>Connectez-vous pour gérer vos tâches</p>
               {message && <p style={{color : asError ? 'red' : 'green'}}> {message} {user}  </p> }
               <br/>

               <form onSubmit={handleLogin} className="Form-auth">

                  <label>Email :</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ex: jeanthomas@gmail.com" required/>
                  <br/><br/>
                  <label>Password :</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="........"  required/>
                  <br/>
                  <button type="submit" className="btn">Se connecter</button>
               </form>
               <p className="msg">Pas encore de compte ? <Link to="/Register" className="lien">S'inscrire</Link></p>
            </div>
        </section>
    )
}