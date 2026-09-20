import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/register.css';

export default function Header ({username}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        navigate('/Login');
    };

    return(
        <header className="app-header">
            <div className="logo"><h2>TaskFlow</h2></div>
            <div className="user-area">
                <span>{username || Invité}</span>
                <button onClick={handleLogout}>Déconnexion</button>
            </div>
        </header>
    );
}