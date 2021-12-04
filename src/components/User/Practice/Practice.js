import React, { useState, useEffect } from "react";
import Parse from 'parse/dist/parse';
import FlashcardList from '../../FlashcardList/FlashcardList.js';
import BeatLoader from "react-spinners/BeatLoader";
import './Practice.css';

let practiceList = [];
let result = [];

async function getPracticeList() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    const userId = localStorage.getItem('userId');
    try {
        let user = await query.get(userId);
        const list = user.get('practiceCards');
        const array = Object.entries(list);
        for (let [index, card] of array) {
            const category = card.get('category');
            const question = card.get('question');
            const answer = card.get('answer');
            const owner = card.get('owner');
            const queryResult = {
                id: card.id,
                category,
                question,
                answer,
                owner
            }
            result.push(queryResult);
        }
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }
    return result;
}

function Practice() {
    let [practiceCards, setPracticeCards] = useState(practiceList);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        async function fetchWebData() {
            try {
                const res = await getPracticeList();
                setPracticeCards(res);
                setTimeout(() => {
                    setLoading(false);
                }, 3000)
            } catch (err) {
                console.log(err);
            }
        }
        fetchWebData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {loading
                ? <div className="loader">
                    <BeatLoader className="loading-clip" color={'#E7D4F6'} loading={loading} size={30} />
                    <h1 className="loader-heading">Loading...</h1>
                </div>
                : <div>
                    {practiceCards.length > 0
                        ? <FlashcardList flashcards={practiceCards} />
                        : <div className="no-cards">
                            <div className="left-container">
                                <h1 className="no-cards-heading">There are currently no Flashcards in your Practice List yet.</h1>
                                <h1 className="no-cards-heading">Why don't you browse our library of flashcards to to start adding them to your list?</h1>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Practice;