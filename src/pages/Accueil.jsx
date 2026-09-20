import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskItem from '../components/TaskItem';
import '../css/register.css';

export default function Accueil () {

    const[tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('Toutes');
    const user = localStorage.getItem('userName') || 'Visiteur';
     const userId = localStorage.getItem('userId');

    //recuperation des tasks
    const fetchTasks = async () => {
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/tasks?user_id=${userId}`);
            setTasks(response.data);
        }catch(error){
            console.error("Erreur de chargement des tâches !");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    //suppression
    const handleDelete = async (id) => {
        if(window.confirm("Voulez-vous vraiment supprimer cette tâche ! ")){
            try{
                await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);
                fetchTasks();
            }catch(error){
                console.error("Erreur de suppression de la tâche !");
            }
        }
    };
    //filtrage
    const filteredTasks = tasks.filter(task => {
        if(filter === "Toutes") return true;
        return task.statut === filter;
    })
    return(
        <div>
            <Header username= {user}/>
            <main>
                <div className="container-accueil">

                    <div className="ajout">
                       <Link to="/TaskForm">
                         <button className="ajout">+ Nouvelle tâche </button>
                       </Link>
                    </div>
                    <br/>
                    <div className="filter-btns">
                        {['Toutes', 'En attente', 'En cours', 'Terminée'].map(element => (
                            <button key={element} className={`filter-btn ${filter === element ? 'active' : ''}`} onClick={() => setFilter(element)}>{element}</button>
                        ))}
                    </div>
                    <div className="details-info">
                       {filteredTasks.length > 0 ? (
                            filteredTasks.map(task => (
                               <TaskItem key={task.id} task={task} onDelete={handleDelete} />
                            ))
                            ) : ( <p className="no-task">Aucune tâche trouvée pour ce filtre !</p>)
                       }
                   </div>
                </div>
            </main>
            <Footer/>
        </div>


    )
}