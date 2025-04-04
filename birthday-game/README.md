# Birthday Guessing Game

A fun and interactive birthday guessing game built with React. Players must guess who the birthday boy is from a list of options.

## Features

- Login system with name and email
- Animated game interface
- Multiple choice questions
- Winner announcement with celebration effects
- Limited to two winners
- Responsive design

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Game

To start the development server:
```bash
npm run dev
```

The game will be available at `http://localhost:5173`

## Game Flow

1. Players enter their name and email
2. They are presented with multiple options to guess the birthday boy
3. Upon correct guess:
   - Celebration sound plays
   - Winner screen appears showing the birthday boy's details
   - Player's information is saved
4. Game ends after two winners

## Technologies Used

- React
- React Router
- Emotion (for styling)
- Framer Motion (for animations)
- Howler.js (for sound effects)

## Note

You'll need to replace the placeholder image URLs with actual images of the birthday boy and the animated character.
