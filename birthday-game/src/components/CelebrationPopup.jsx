import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
`;

const WinnerText = styled.h1`
  color: #4CAF50;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin: 1rem 0;
`;

const PrizeButton = styled(motion.button)`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  font-weight: bold;

  &:hover {
    background: #45a049;
  }
`;

const CelebrationPopup = ({ onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Play celebration sound
    const celebrationSound = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'],
      volume: 0.5
    });
    celebrationSound.play();

    return () => {
      celebrationSound.stop();
    };
  }, []);

  const handleSeePrice = () => {
    onComplete();
    navigate('/winner');
  };

  return (
    <AnimatePresence>
      <PopupOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <PopupContent
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <WinnerText>🎉 Winner! 🎉</WinnerText>
          <Message>Congratulations! You got enough answers correct!</Message>
          <Message>You've won a special prize!</Message>
          <PrizeButton
            onClick={handleSeePrice}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Click to See Your Prize! 🎁
          </PrizeButton>
        </PopupContent>
      </PopupOverlay>
    </AnimatePresence>
  );
};

export default CelebrationPopup; 