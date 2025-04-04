import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import QuestionComponent from './components/QuestionComponent'
import WinnerScreen from './components/WinnerScreen'
import CelebrationPopup from './components/CelebrationPopup'
import LostGamePopup from './components/LostGamePopup'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [winners, setWinners] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showLostGame, setShowLostGame] = useState(false)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleAnswer = (isCorrect) => {
    const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;
    setCorrectAnswers(newCorrectAnswers);
    
    if (currentQuestionIndex === 3) {
      // On the last question (work question)
      if (newCorrectAnswers >= 3) {
        setShowCelebration(true);
      } else {
        setShowLostGame(true);
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }

  const handleCelebrationComplete = () => {
    if (winners.length < 2) {
      setWinners([...winners, user]);
    }
    setShowCelebration(false);
  }

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setShowLostGame(false);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <Navigate to="/game" replace />
            )
          }
        />
        <Route
          path="/game"
          element={
            user ? (
              showCelebration ? (
                <CelebrationPopup onComplete={handleCelebrationComplete} />
              ) : showLostGame ? (
                <LostGamePopup onTryAgain={handleTryAgain} />
              ) : (
                <QuestionComponent
                  currentQuestionIndex={currentQuestionIndex}
                  onAnswer={handleAnswer}
                />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/winner"
          element={
            winners.length > 0 ? (
              <WinnerScreen />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App
