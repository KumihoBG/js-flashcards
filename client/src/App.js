import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoryIntro from './components/CategoryIntro/CategoryIntro.js';
import Category from './components/Category/Category.js';
import Navbar from './components/Navbar/Navbar.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import FlashcardsBasic from './components/FlashcardsBasic/FlashcardsBasic.js';
import FlashcardsAdvanced from './components/FlashcardsAdvanced/FlashcardsAdvanced.js';
import FlashcardsWeb from './components/FlashcardsWeb/FlashcardsWeb.js';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/' exact render={(props) => (
          <>
            <Header />
            <CategoryIntro />
            <Navbar />
            <Category />
            <Footer />
          </>
        )} />
        <Route path='/auth/register' component={Register} />
        <Route path='/auth/login' component={Login} />
        <Route path='/flashcards-basic' render={(props) => (
          <React.Fragment>
            <Navbar />
            <FlashcardsBasic />
          </React.Fragment>
        )} />
        <Route path='/flashcards-advanced' render={(props) => (
          <React.Fragment>
            <Navbar />
            <FlashcardsAdvanced />
          </React.Fragment>
        )} />
        <Route path='/flashcards-web' render={(props) => (
          <React.Fragment>
            <Navbar />
            <FlashcardsWeb />
          </React.Fragment>
        )} />
      </div>
    </Router>
  );
}


export default App;
