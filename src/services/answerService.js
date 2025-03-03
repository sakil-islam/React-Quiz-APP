import { loadState, saveState } from '../utils/localStorage';

const ANSWERS_KEY = 'quizAnswers';

export const getAnswerHistoryForQuestion = (category) => {
    const allAnswers = loadState(ANSWERS_KEY) || [];
    const questionAnswers = allAnswers.filter(
        answer => answer.category === category
    );
    return questionAnswers;
};

// Saves a new answer or edits an existing one
export const saveAnswer = (userId, category, questionId, questionText, answer, isCorrect) => {
    const allAnswers = loadState(ANSWERS_KEY) || [];

    // Find if there's an existing answer record for this question
    const existingAnswerRecordIndex = allAnswers.findIndex(
        record => record.userId === userId && record.category === category && record.questionId === questionId
    );

    const newAnswer = { answer, isCorrect, timestamp: Date.now() };

    if (existingAnswerRecordIndex > -1) {
        // Update the existing answer record
        const existingAnswerRecord = allAnswers[existingAnswerRecordIndex];
        existingAnswerRecord.answerHistory = Array.isArray(existingAnswerRecord.answerHistory)
            ? [...existingAnswerRecord.answerHistory, newAnswer]
            : [newAnswer];
        allAnswers[existingAnswerRecordIndex] = existingAnswerRecord;
    } else {
        // Create a new answer record
        const newAnswerRecord = {
            userId,
            category,
            questionId,
            questionText,
            answerHistory: [newAnswer]
        };
        allAnswers.push(newAnswerRecord);
    }

    saveState(ANSWERS_KEY, allAnswers);
};