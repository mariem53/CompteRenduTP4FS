/*import React, { useState, useEffect, createContext, useContext } from 'react';

// ----------------- Exercice 1 : Time -----------------
function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId); // nettoyage à la désinstallation
  }, []);

  return <p>Heure actuelle : {time.toLocaleTimeString()}</p>;
}

// ----------------- Exercice 2 : useContext -----------------
const ThemeContext = createContext();

// Provider qui gère le thème
function ThemeProvider({ children }) {
const [theme, setTheme] = useState('light');
const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
return ( <ThemeContext.Provider value={{ theme, toggleTheme }}> {children}
</ThemeContext.Provider> ); }
// Composant qui consomme le contexte
function ThemeToggle() {
const { theme, toggleTheme } = useContext(ThemeContext);
return (
<div>
<p>Thème actuel : {theme}</p>

<button onClick={toggleTheme}>Changer le thème</button>
</div> ); } 

// ----------------- Exercice 3 : API avec useEffect -----------------
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors du chargement des utilisateurs');
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------------- Composant principal App -----------------
function App() {
  return (
    <div>
      <h1>TP React – Hooks</h1>
      <Time />
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
      <UserList />
    </div>
  );
}

export default App;
*/
import React, { createContext, useContext, useState, useEffect } from 'react';

// ----------------- Contexte utilisateur -----------------
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Alice', connected: true });

  const toggleConnection = () => {
    setUser(prev => ({ ...prev, connected: !prev.connected }));
  };

  return (
    <UserContext.Provider value={{ user, toggleConnection }}>
      {children}
    </UserContext.Provider>
  );
}

// ----------------- Profil utilisateur -----------------
function UserProfile() {
  const { user, toggleConnection } = useContext(UserContext);

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Profil utilisateur</h2>
      <p>Nom : {user.name}</p>
      <p>Status : {user.connected ? 'Connecté' : 'Déconnecté'}</p>
      <button onClick={toggleConnection}>
        {user.connected ? 'Se déconnecter' : 'Se connecter'}
      </button>
    </div>
  );
}

// ----------------- Notifications -----------------
function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([
        "Bienvenue dans l'application !",
        "Nouveau message reçu",
        "Mise à jour disponible"
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p>Chargement des notifications...</p>;

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((note, i) => (
          <li key={i}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

// ----------------- Compteur de notifications -----------------
function NotificationCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ marginTop: 20 }}>
      <p>Notifications lues : {count}</p>
      <button onClick={() => setCount(count + 1)}>Marquer une notification lue</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: 10 }}>Réinitialiser</button>
    </div>
  );
}

// ----------------- Composant principal -----------------
function App() {
  return (
    <UserProvider>
      <div style={{ fontFamily: 'Arial', padding: 20 }}>
        <h1>Mon Application React</h1>
        <UserProfile />
        <Notifications />
        <NotificationCounter />
      </div>
    </UserProvider>
  );
}

export default App;
