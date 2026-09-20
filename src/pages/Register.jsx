import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

export default function Regsiter() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [asError, setAsError] = useState(false);
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    const handleRegistre = async (e) => {
        e.preventDefault();
        setMessage('');
        setUser('');

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });

            setAsError(false);
            setMessage(response.data.message);
            setUser(response.data.user.name);

            setTimeout(() => {
                navigate('/Login', {replace: true});
            }, 2000);

        }catch(error){
            setAsError(true);
            if(error.response && error.response.data){
                const errMsg = error.response.data.message || "Erreur lors de l'inscription !";
                setMessage(errMsg);
            }else{
                setMessage("Impossible de s'enregistrer au serveur !")
            };
        };
    }

    return(
        <section className="container-auth">
            <div className="container-card-auth">
               <h1>Bienvenue dans <em>TaskFlow</em></h1>
               <p>Créer votre compte pour gérer vos tâches</p>
               {message && <p style={{color : asError ? 'red' : 'green'}}> {message} {user}  </p> }
               <br/>

               <form onSubmit={handleRegistre} className="Form-auth">
                  <label>Nom :</label>
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Jean Thomas" required/>

                  <br/><br/>
                  <label>Email :</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ex: jeanthomas@gmail.com" required/>

                  <br/><br/>
                  <label>Password :</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="........"  required/>

                  <br/><br/>
                  <label>Password confirm :</label>
                  <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="........"  required/>

                  <br/>

                  <button type="submit" className="btn">S'inscrire</button>
               </form>
               <p className="msg">Déjà un compte ? <Link to="/Login" className="lien">Se connecter</Link></p>
            </div>
        </section>
    )
}