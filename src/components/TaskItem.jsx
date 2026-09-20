import React from 'react';
import {Link} from 'react-router-dom';
import '../css/register.css';

const TaskItem = ({task, onDelete}) => {
    
    return(
        <section className="container-task">
            <div className="taskitems-card">
                <div className="task-info">
                    <h4>Titre : {task.titre}</h4><br/>
                    <h4>Statut : <span className={`statut ${task.statut  === 'En attente' ? 'redColor'
                         : task.statut  === 'En cours' ? 'greenColor' : 'bleuColor'}`}>{task.statut} </span></h4>
                </div><br/>
                <div className="task-action">
                    <Link to={`/TaskForm/${task.id}`}>
                      <button className="edit">Modifier</button>
                    </Link>
                    <button className="del" onClick={() => onDelete(task.id)}>Supprimer</button>
                </div>
            </div>
        </section>
    );
};
export default TaskItem;

