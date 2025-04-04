import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

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

const LostText = styled.h1`
  color: #f44336;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin: 1rem 0;
`;

const TryAgainButton = styled(motion.button)`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: #45a049;
  }
`;

const LostGamePopup = ({ onTryAgain }) => {
  useEffect(() => {
    // Play sad sound
    const sadSound = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-sad-game-over-trombone-471.mp3'],
      volume: 0.5
    });
    sadSound.play();

    return () => {
      sadSound.stop();
    };
  }, []);

  return (
    <AnimatePresence>
      <PopupOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <PopupContent
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <LostText>😢 Oh No! 😢</LostText>
          <Message>You didn't get enough correct answers.</Message>
          <Message>Better luck next time!</Message>
          <TryAgainButton
            onClick={onTryAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </TryAgainButton>
        </PopupContent>
      </PopupOverlay>
    </AnimatePresence>
  );
};

export default LostGamePopup; 