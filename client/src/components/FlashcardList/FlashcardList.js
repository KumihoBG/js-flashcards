import React from 'react'
import Flashcard from '../Flashcard/Flashcard.js';
import '../FlashcardList/FlashcardsList.css';

function FlashcardList({ flashcards }) {
    return (
        <div className="flashcards-list-container">
            <div className="flashcards-wrapper">
                <div className="card-list-titles">
                    <h1>Тest your skills in JavaScript basic terminology</h1>
                    <h3>Pick a card and try to answer it. Then reveal it in order to see the correct answer.<br></br>If you feel like you need to practice this question more than once, just add it your Practice List by clicking the <ion-icon name="add-circle-outline"></ion-icon> icon.</h3>
                </div>

                <div className="flashcards-container">
                    { flashcards.map(flashcard => {
                        return <Flashcard flashcard={flashcard} key={flashcard.id} />
                    })}
                </div>
        </div>
        </div>
    )
}

export default FlashcardList
