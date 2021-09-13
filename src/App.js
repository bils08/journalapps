import React from 'react'; 
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import JournalList from "./components/JournalList";
import EditJournal from "./components/EditJournal";
import CreateJournal from "./components/CreateJournal";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={JournalList} />
      <Route path="/edit/:id" component={EditJournal} />
      <Route path="/create" component={CreateJournal} />
      <Route path="/user" component={CreateUser} />
      <Route path="/userList" component={UserList} />
    </Router>
  );
}

export default App;
