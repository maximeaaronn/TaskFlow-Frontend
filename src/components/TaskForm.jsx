import React,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

export default function TaskForm () {
    const[titre, setTitre] = useState('');
    const[description, setDescription] = useState('');
    const[statut, setStatut] = useState('En attente');

    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const {id} = useParams();
    const editingTask = Boolean(id);

    useEffect(() => {
        if(editingTask) {
            axios.get(`https://taskflow-backend-s4hm.onrender.com/api/tasks/${id}`)
                .then(
                    response => {
                        setTitre(response.data.titre);
                        setDescription(response.data.description);
                        setStatut(response.data.statut)
                    }
                )
                .catch(error => console.error("Erreur de chargement de la tâche ! "));
        }
    }, [id, editingTask]);

    const handleCreate = async (e) => {
            e.preventDefault();

            try{
                await axios.post('https://taskflow-backend-s4hm.onrender.com/api/tasks', {
                   titre,
                   description,
                   statut,
                   user_id: userId
                });
                navigate("/Accueil", {replace: true});
            }catch(error){
                console.error("Création de la tâche impossible !");
            
            };
    };

    const handleEdit = async (e) => {
            e.preventDefault();
            try{
                await axios.put(`https://taskflow-backend-s4hm.onrender.com/api/tasks/${id}`, {
                   titre,
                   description,
                   statut,
                   user_id: userId
                });
                navigate("/Accueil", {replace: true});
            }catch(error){
               console.error("Modification de la tâche impossible ! ");
            };
        
    };

    return(
        <section className="container-auth">
            <div className="container-card-auth">
                <h1>{editingTask ? 'Modifier la tâche' : 'Créer une tâche'}</h1>

                <form onSubmit={editingTask ? handleEdit : handleCreate} className="Form-auth">
                  <label>Titre :</label>
                  <input type="text" className="form-control" value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Cahier des charges" required/>

                  <br/>
                  <label>Description :</label>
                  <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Les informations..."/>

                  <br/>
                  <label>Statut :</label>
                  <select className="form-control" value={statut} onChange={(e) => setStatut(e.target.value)}>
                    <option value="En attente">En attente</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminée">Terminée</option>
                  </select>
                  <br/>
                  <button type="submit">{editingTask ? 'Modifier' : 'Créer' }</button>
                  <br/>
                  <Link to="/Accueil">
                    <button style={{background: 'red'}}>Annuler</button>
                  </Link>
                </form>
            </div>
        </section>
    )
}
