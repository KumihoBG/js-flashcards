import Parse from 'parse/dist/parse';
import { store } from 'react-notifications-component';
const baseUrl = 'https://parseapi.back4app.com/classes/Flashcard';

export const getCard = async (id) => {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('objectId', id);
    try {
        const results = await query.find();
        for (const object of results) {
            const category = object.get('category')
            const question = object.get('question')
            const answer = object.get('answer')
            const owner = object.get('owner')
            console.log(category);
            console.log(question);
            console.log(answer);
            console.log(owner);
        }
    } catch (error) {
        console.error('Error while fetching Flashcard', error);
    }
};

export const getAll = async () => {
    let response = await fetch(`${baseUrl}/pets`)

    let pets = await response.json();

    let result = Object.values(pets)

    return result;
};

export const create = async (data) => {
    if (data.category !== undefined && data.question !== undefined && data.answer !== undefined) {
        try {
            const newFlashcard = new Parse.Object('Flashcard');
            const currentUser = Parse.User.current();
            const category = data.category;
            const question = data.question;
            const answer = data.answer;
            newFlashcard.set('category', category);
            newFlashcard.set('question', question);
            newFlashcard.set('answer', answer);
            newFlashcard.set('owner', currentUser);
            currentUser.add('myCards', data = { category, question, answer, currentUser });
            try {
                const result = await newFlashcard.save();
                const response = await currentUser.save();
                console.log('User updated ', response);
                console.log('Flashcard created', result);
            } catch (error) {
                console.error('Error while creating Flashcard: ', error);
            }
        } catch (err) {
            console.log(err.message)
        }
    }
};

export const onEdit = async (id, data) => {
    const query = new Parse.Query('Flashcard');
    try {
        const object = await query.get(id);
        object.set('question', data.questionEdit);
        object.set('answer', data.answerEdit);
        try {
            const response = await object.save();
            console.log('Flashcard updated', response);
        } catch (error) {
            console.error('Error while updating Flashcard', error);
        }
    } catch (error) {
        console.error('Error while retrieving object Flashcard', error);
    }
};

export async function updateCardDetails(id, owner) {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('objectId', id);
    try {
        const results = await query.find();
        for (const object of results) {
            const question = object.get('question');
            const answer = object.get('answer');
            let currentOwner = object.get('owner');
            owner = currentOwner;
            const updatedCard = {
                question,
                answer,
                owner
            }
            return updatedCard;
        }
    } catch (error) {
        console.error('Error while fetching Flashcard', error);
    }
}

export async function getMyCards() {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.ascending('category');
    const userId = localStorage.getItem('userId');
    const myCards = [];

    try {
        const result = await query.find();
        const cards = JSON.parse(JSON.stringify(result));
        for (let current of cards) {
            const owner = current.owner.objectId;
            if (owner === userId) {
                myCards.push(current);
            }
        }
        return myCards;

    } catch (error) {
        console.error('Error while fetching Flashcard', error);
    }
}

export async function deleteCard(id) {
    const query = new Parse.Query('Flashcard');
    try {
        const object = await query.get(id);
        try {
            const response = await object.destroy();
            console.log('Deleted ParseObject', response);
        } catch (error) {
            console.error('Error while deleting ParseObject', error);
        }
    } catch (error) {
        console.error('Error while retrieving ParseObject', error);
    }
};

export async function practice(id) {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('objectId', id);
    try {
        const currentCard = await query.get(id);
        const currentUser = Parse.User.current();
        const cardIds = [];
        const practiceList = currentUser.get('practiceCards');
        for (let card of practiceList) {
            if (!currentCard.id === card.id) {
                cardIds.push(card.id);
            }
        }
        const check = cardIds.includes(currentCard.id);
        if (!check) {
            currentUser.add('practiceCards', currentCard);
            await currentUser.save();
            store.addNotification({
                title: "Card added to your Practice List!",
                message: 'Redirecting you to practice page...',
                type: "info",
                insert: "bottom-center",
                container: "center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
        } else {
            console.log('This card is already added to the Practice list.');
            store.addNotification({
                title: "This action cannot be executed!",
                message: "This card is already added to your Practice list.",
                type: "info",
                insert: "bottom-center",
                container: "center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            return null;
        }
    } catch (err) {
        console.log(err.message)
    }
}

export async function checkIfInPracticeList(id, ownerId) {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    query.equalTo('objectId', id);
    try {
        const currentCard = await query.get(id);
        const currentUser = Parse.User.current();
        const cardIds = [];
        const practiceList = currentUser.get('practiceCards');
        for (let card of practiceList) {
            cardIds.push(card.id);

        }
        const check = cardIds.includes(currentCard.id);
        return check;
    } catch (err) {
        console.log(err.message)
    }
}

export async function removeCardFromPractice(id, userId) {
    let user = Parse.User.current();
    const practiceList = user.get('practiceCards');
    try {
        for (let card of practiceList) {
            console.log(card);
            if (card.id === id) {
                let index = practiceList.indexOf(card);
                practiceList.splice(index, 1);
                user.set('practiceCards', practiceList);
            }
        }
        try {
            // Saves the user with the updated data
            let response = await user.save();
            window.location.reload(`/practice/${userId}`);
            console.log('Updated user', response);
          } catch (error) {
            console.error('Error while updating user', error);
        }
    } catch (err) {
        console.log(err.message)
    }
}

export async function getName(ownerId) {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
        let user = await query.get(ownerId);
        const nameResult = user.get('username');
        return nameResult;
    } catch (error) {
        console.error('Error while fetching user', error);
    }
};

export async function countMyCards(userId) {
    const Flashcard = Parse.Object.extend('Flashcard');
    const query = new Parse.Query(Flashcard);
    let myCards = 0;

    try {
        const result = await query.find();
        const cards = JSON.parse(JSON.stringify(result));

        for (let current of cards) {
            const owner = current.owner.objectId;
            if (owner === userId) {
                myCards++;
            }
        }
        return myCards;

    } catch (error) {
        console.error('Error while fetching Flashcard', error);
    }
}

export async function getUserLevel(userId) {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
        let user = await query.get(userId);
        let level = user.attributes.userLevel;
        const contribution = await countMyCards(userId);
        if (contribution <= 0 && contribution <= 5) {
            level = "Disciple";
        } else if (contribution > 5 && contribution <= 10) {
            level = "Pilgrim";
        } else if (contribution > 11 && contribution <= 15) {
            level = "Junior Apprentice";
        } else if (contribution > 16 && contribution <= 20) {
            level = "Apprentice";
        } else if (contribution > 21 && contribution <= 25) {
            level = "Strategos";
        } else if (contribution > 26 && contribution <= 30) {
            level = "Royal Strategos";
        } else if (contribution > 31 && contribution <= 35) {
            level = "Scholar";
        } else if (contribution > 36 && contribution <= 40) {
            level = "Royal Scholar";
        } else if (contribution > 41 && contribution <= 45) {
            level = "Protector";
        } else if (contribution > 46 && contribution <= 50) {
            level = "Advisor";
        } else if (contribution > 51 && contribution <= 55) {
            level = "Cleric";
        } else if (contribution > 56 && contribution <= 60) {
            level = "King’s Advisor";
        } else if (contribution > 61 && contribution <= 65) {
            level = "Prime Justicar";
        } else if (contribution > 66 && contribution <= 70) {
            level = "Archduke";
        } else if (contribution > 71 && contribution <= 75) {
            level = "High Templar";
        } else if (contribution > 76 && contribution <= 80) {
            level = "Grand Admiral";
        } else if (contribution > 81 && contribution <= 85) {
            level = "Royal Inquisitor";
        } else if (contribution > 86 && contribution <= 90) {
            level = "Magister";
        } else if (contribution > 91 && contribution <= 95) {
            level = "High Prince";
        } else if (contribution > 96 && contribution <= 100) {
            level = "High Emperor";
        }
        await user.set('userLevel', level);
        await user.save();
        return level;
    } catch (err) {
        console.log(err.message)
    }
}

export async function createdAt(userId) {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
        let user = await query.get(userId);
        let created = JSON.stringify(user.attributes.createdAt);
        const date = created.slice(1, 11);
        return date;
    } catch (err) {
        console.log(err.message)
    }
}
