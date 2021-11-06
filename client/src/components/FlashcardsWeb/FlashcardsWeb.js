import React, { useState } from 'react';
import '../FlashcardsWeb/FlashcardsWeb.css';
import FlashcardList from '../FlashcardList/FlashcardList.js';

function FlashcardsWeb() {
    const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
    return (
        <FlashcardList flashcards={flashcards} />
    )
}

const SAMPLE_FLASHCARDS = [
    {
        id: 1,
        question: "What is CSS",
        answer: "CSS stands for Cascading Style Sheets · CSS describes how HTML elements are to be displayed on screen, paper, or in other media."
    },
    {
        id: 2,
        question: "What is CSS",
        answer: "CSS stands for Cascading Style Sheets · CSS describes how HTML elements are to be displayed on screen, paper, or in other media."
    },
    {
        id: 3,
        question: "What is CSS",
        answer: "CSS stands for Cascading Style Sheets · CSS describes how HTML elements are to be displayed on screen, paper, or in other media."
    }
]

export default FlashcardsWeb;
