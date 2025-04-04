import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';
import boyImage from '../assets/WhatsApp Image 2025-04-04 at 15.16.01.jpeg';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

const BoyAnimation = styled(motion.div)`
  width: 150px;
  height: 150px;
  background: url(${boyImage}) center/cover;
  margin-bottom: 2rem;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 600px;
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

const GameComponent = ({ onWin }) => {
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const [boyAnimation, setBoyAnimation] = useState('idle');

  const options = [
    { id: 1, name: 'John Doe', isCorrect: false },
    { id: 2, name: 'Dovhani Makunamisha', isCorrect: true },
    { id: 3, name: 'Mike Smith', isCorrect: false },
    { id: 4, name: 'David Johnson', isCorrect: false }
  ];

  const celebrationSound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'],
    volume: 0.5
  });

  const handleOptionClick = (option) => {
    setShowResult(true);
    setBoyAnimation(option.isCorrect ? 'celebrate' : 'sad');

    if (option.isCorrect) {
      celebrationSound.play();
      setTimeout(() => {
        if (onWin()) {
          navigate('/winner');
        }
      }, 2000);
    }
  };

  return (
    <GameContainer>
      <BoyAnimation
        animate={boyAnimation}
        variants={{
          idle: { scale: 1 },
          celebrate: { scale: 1.2, rotate: 360 },
          sad: { scale: 0.8 }
        }}
        transition={{ duration: 0.5 }}
      />
      
      <h2>Who is the birthday boy?</h2>
      
      <OptionsContainer>
        {options.map((option) => (
          <OptionButton
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={showResult ? (option.isCorrect ? 'correct' : 'incorrect') : ''}
            disabled={showResult}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.name}
          </OptionButton>
        ))}
      </OptionsContainer>
    </GameContainer>
  );
};

export default GameComponent; 