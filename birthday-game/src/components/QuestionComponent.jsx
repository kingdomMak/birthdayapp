import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

const QuestionCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const OptionButton = styled(motion.button)`
  padding: 1rem;
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;

  &:hover {
    background: #f0f0f0;
    transform: scale(1.05);
  }

  &.correct {
    background: #4CAF50;
    color: white;
  }

  &.incorrect {
    background: #f44336;
    color: white;
  }
`;

const QuestionText = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const questions = [
  {
    id: 'name',
    question: 'Who is the birthday boy?',
    options: [
      { text: 'John Doe', isCorrect: false },
      { text: 'Dovhani Makunamisha', isCorrect: true },
      { text: 'Mike Smith', isCorrect: false },
      { text: 'David Johnson', isCorrect: false }
    ]
  },
  {
    id: 'age',
    question: 'How old is Dovhani turning?',
    options: [
      { text: '35 years', isCorrect: false },
      { text: '38 years', isCorrect: false },
      { text: '40 years', isCorrect: true },
      { text: '42 years', isCorrect: false }
    ]
  },
  {
    id: 'location',
    question: 'Where does Dovhani live?',
    options: [
      { text: 'Pretoria East', isCorrect: false },
      { text: 'Thatchfield', isCorrect: true },
      { text: 'Centurion', isCorrect: false },
      { text: 'Midrand', isCorrect: false }
    ]
  },
  {
    id: 'workplace',
    question: 'Where does Dovhani work?',
    options: [
      { text: 'University of Pretoria', isCorrect: false },
      { text: 'CSIR', isCorrect: false },
      { text: 'UNISA', isCorrect: true },
      { text: 'Tshwane University', isCorrect: false }
    ]
  }
];

const QuestionComponent = ({ currentQuestionIndex, onAnswer }) => {
  const [showResult, setShowResult] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      onAnswer(option.isCorrect);
    }, 1500);
  };

  return (
    <QuestionContainer>
      <QuestionCard
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <QuestionText>{currentQuestion.question}</QuestionText>
        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleOptionClick(option)}
              className={showResult ? (option.isCorrect ? 'correct' : 'incorrect') : ''}
              disabled={showResult}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option.text}
            </OptionButton>
          ))}
        </OptionsContainer>
      </QuestionCard>
    </QuestionContainer>
  );
};

export default QuestionComponent; 