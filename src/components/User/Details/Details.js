import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { store } from 'react-notifications-component';
import * as cardService from '../../../services/cardService.js';
import { Link, useNavigate } from 'react-router-dom';
import '../Details/Details.css';

function Details() {
    let { id } = useParams();
    let [currentQuestion, setCurrentQuestion] = useState('');
    let [currentAnswer, setCurrentAnswer] = useState('');
    let [currentOwner, setCurrentOwner] = useState('');
    let [currentCategory, setCurrentCategory] = useState('');
    let [check, setCheck] = useState(false);
    const [add, setAdd] = useState(false);
    const localStorageOwnerId = localStorage.getItem('userId');
    let currentCardOwnerId = '';
    const navigate = useNavigate();

    const editDeleteBtns = <div className="buttons">
        <Link
            onClick={onDelete}
            alt="delete-page"
            className="flashcard-buttons"
            to={`/delete/${id}`}
        >Delete
        </Link>
        <Link
            className="flashcard-buttons"
            to={`/edit/${id}`}
            alt="edit-page"
            state={{
                id: id,
                question: currentQuestion,
                answer: currentAnswer,
                ownerId: currentCardOwnerId
            }}
        >Edit</Link>
    </div>;

    const practiceBtns = <div>
        {!add
            ? <div className="buttons">
                <Link
                    className="flashcard-buttons"
                    to={`/practice/${localStorageOwnerId}`}
                    alt="practice"
                    onClick={() => {
                        cardService.practice(id);
                    }}
                >Practice
                </Link>
            </div>
            : <div className="buttons">
                <Link
                    className="button-disabled"
                    to={`/details/${id}`}
                    alt="details"
                    onClick={(event) => event.preventDefault()}
                ><ion-icon name="alert-circle-outline"></ion-icon> Card already in your List
                </Link>
                <Link
                    onClick={onRemove}
                    className="button-remove"
                    to={`/practice/${localStorageOwnerId}`}
                    alt="practice-list"
                    state={{
                        id: id,
                        question: currentQuestion,
                        answer: currentAnswer,
                        ownerId: currentCardOwnerId
                    }}
                >Remove card from practice
                </Link>
            </div>
        }
    </div>

    useEffect(() => {
        async function fetchData() {
            try {
                const currentCard = await cardService.getCard(id);
                const currentCardOwnerId = currentCard.owner.id;
                const ownerName = await cardService.getName(currentCardOwnerId);
                setCurrentQuestion(currentCard.question);
                setCurrentAnswer(currentCard.answer);
                setCurrentOwner(ownerName);
                setCurrentCategory(currentCard.category);
                setCheck(currentCardOwnerId === localStorageOwnerId);
                const res = await cardService.updateCardDetails(id, currentCardOwnerId);
                setCurrentQuestion(res.question);
                setCurrentAnswer(res.answer);
                let foundCard = await cardService.checkIfInPracticeList(id, currentOwner);
                if (foundCard) {
                    setAdd(true);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function onDelete(e) {
        e.preventDefault();
        await cardService.deleteCard(id)
            .then(result => {
                navigate(-1);
            })
    }

    async function onRemove(e) {
        e.preventDefault();

        await cardService.removeCardFromPractice(id, localStorageOwnerId)
            .then(result => {
                setTimeout(() => {
                store.addNotification({
                    title: "Success!",
                    message: "Card removed from your practice list.",
                    type: "info",
                    insert: "bottom-center",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                });
            }, 3000);
            })
    }

    if (currentOwner === undefined || currentOwner === null) {
        currentOwner = 'Unknown';
    }

    return (
        <div className="details-container animate__animated animate__slideInRight">
            <div className="cube">
                <div className="top"></div>
                <div>
                    <span className="spanOne">{currentQuestion}</span>
                    <span className="spanTwo">{currentQuestion}</span>
                    <span className="spanThree">{currentQuestion}</span>
                    <span className="spanFour">{currentQuestion}</span>
                </div>
            </div>
            <div className="details-card">
                <h2 className="details"><span className="details-title">Flashcard Details:</span></h2>
                <h2 className="details-heading"><span className="details-title">Flashcard id:</span> {id}</h2>
                <h2 className="details-heading"><span className="details-title">Category:</span> {`${currentCategory}`}</h2>
                <h2 className="details-heading"><span className="details-title">Question:</span> {currentQuestion}</h2>
                <h2 className="details-heading"><span className="details-title">Answer:</span> {currentAnswer}</h2>
                <div><h2 className="details-heading"><span className="details-title">Creator:</span> {currentOwner}</h2></div>
                {localStorageOwnerId
                    ? <div>{check
                        ? editDeleteBtns
                        : practiceBtns
                    }</div>
                    : <div></div>
                }
            </div>
        </div>
    )
}

export default Details;
