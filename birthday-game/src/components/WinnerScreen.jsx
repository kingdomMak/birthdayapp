import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import birthdayBoyImage from '../assets/WhatsApp Image 2025-04-04 at 15.16.00.jpeg';

const WinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const BirthdayCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  z-index: 1;
`;

const BirthdayImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 1rem 0;
  object-fit: cover;
`;

const BirthdayText = styled.h2`
  color: #333;
  margin: 1rem 0;
`;

const AgeText = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin: 0.5rem 0;
`;

const PrizeText = styled.p`
  font-size: 1.2rem;
  color: #4CAF50;
  font-weight: bold;
  margin: 1rem 0;
`;

const Balloon = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 60px;
  background: ${props => props.color || '#ff0000'};
  border-radius: 50%;
  z-index: 0;
`;

const WinnerScreen = () => {
  useEffect(() => {
    // Play celebration music
    const celebrationMusic = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-happy-birthday-song-2020.mp3'],
      volume: 0.5,
      loop: true
    });
    celebrationMusic.play();

    return () => {
      celebrationMusic.stop();
    };
  }, []);

  const balloons = [
    { color: '#ff0000', delay: 0 },
    { color: '#00ff00', delay: 0.2 },
    { color: '#0000ff', delay: 0.4 },
    { color: '#ffff00', delay: 0.6 },
    { color: '#ff00ff', delay: 0.8 }
  ];

  return (
    <WinnerContainer>
      {balloons.map((balloon, index) => (
        <Balloon
          key={index}
          color={balloon.color}
          initial={{ y: '100vh', x: `${index * 20}%` }}
          animate={{ y: '-100px', x: `${index * 20}%` }}
          transition={{
            duration: 3,
            delay: balloon.delay,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      ))}
      
      <BirthdayCard
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BirthdayText>Congratulations!</BirthdayText>
        <BirthdayImage
          src={birthdayBoyImage}
          alt="Dovhani Makunamisha"
        />
        <BirthdayText>Dovhani Makunamisha</BirthdayText>
        <AgeText>40 Years Young!</AgeText>
        <p>Lives in: Thatchfield</p>
        <p>Works at: UNISA</p>
        <PrizeText>You've just won yourself lunch at Centurion Mall!</PrizeText>
        <p>Thank you for playing the birthday game!</p>
      </BirthdayCard>
    </WinnerContainer>
  );
};

export default WinnerScreen; 