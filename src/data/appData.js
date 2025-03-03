const initialQuestions = [
    {
        id: '1',
        category: 'Science',
        text: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'NaCl'],
        correctAnswer: 'H2O'
    },
    {
        id: '2',
        category: 'Science',
        text: 'Which planet is known as the "Red Planet"?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars'
    },
    {
        id: '3',
        category: 'History',
        text: 'In which year did World War II begin?',
        options: ['1939', '1914', '1945', '1941'],
        correctAnswer: '1939'
    },
    {
        id: '4',
        category: 'History',
        text: 'Who was the first President of the United States?',
        options: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'],
        correctAnswer: 'George Washington'
    },
    {
        id: '5',
        category: 'Math',
        text: 'What is the value of pi (π) to two decimal places?',
        options: ['3.14', '3.16', '3.20', '3.24'],
        correctAnswer: '3.14'
    },
    {
        id: '6',
        category: 'Math',
        text: 'Solve for x: 2x + 5 = 15',
        options: ['5', '10', '2', '20'],
        correctAnswer: '5'
    },
];

const initialUsers = [
    {
        id: 'admin',
        password: 'password',
        role: 'admin'
    },
    {
        id: 'user',
        password: 'password',
        role: 'user'
    }
]

const categories = [...new Set(initialQuestions.map(question => question.category))];

export { categories, initialQuestions, initialUsers };
