import { initialQuestions } from '../data/appData';
import { loadState, saveState } from '../utils/localStorage';

const QUESTIONS_KEY = 'questions';

export const getQuestions = () => {
    return loadState(QUESTIONS_KEY) || initialQuestions;
};

export const addQuestion = (newQuestion) => {
    const questions = getQuestions();
    const updatedQuestions = [...questions, { ...newQuestion, id: Date.now().toString() }];
    saveState(QUESTIONS_KEY, updatedQuestions);
    return updatedQuestions;
};

export const updateQuestion = (updatedQuestion) => {
    const questions = getQuestions();
    const updatedQuestions = questions.map(q =>
        q.id === updatedQuestion.id ? { ...updatedQuestion } : q
    );
    saveState(QUESTIONS_KEY, updatedQuestions);
    return updatedQuestions;
};

export const deleteQuestion = (id) => {
    const questions = getQuestions();
    const updatedQuestions = questions.filter(q => q.id !== id);
    saveState(QUESTIONS_KEY, updatedQuestions);
    return updatedQuestions;
};