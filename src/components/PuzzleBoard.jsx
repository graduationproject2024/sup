import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coupleImg from '../assets/couple.jpeg';
import './PuzzleBoard.css';

const COLS = 19;
const ROWS = 20;

// The image is the full picture
// The puzzle pieces will use background-position to show their part
const PuzzleBoard = ({ openedPieces, totalPieces, flyingPiece }) => {
  const boardRef = useRef(null);
  
  // The grid is 19x20 = 380 slots. We have 365 messages.
  // We will auto-fill the remaining 15 slots only when the user finishes all messages.
  const pieces = Array.from({ length: COLS * ROWS }, (_, i) => i);
  const allOpened = openedPieces.length === totalPieces;
  
  return (
    <div className="puzzle-board-wrapper" ref={boardRef}>
      <div className="aspect-ratio-setter">
        <img src={coupleImg} alt="aspect-ratio" className="hidden-img" />
        <div className="puzzle-grid">
        {pieces.map((pieceIndex) => {
          // Extra pieces beyond 365 are shown ONLY when all messages are opened
          const isOpened = openedPieces.includes(pieceIndex) || (allOpened && pieceIndex >= totalPieces);
          const isFlying = flyingPiece === pieceIndex;
          
          const row = Math.floor(pieceIndex / COLS);
          const col = pieceIndex % COLS;
          
          const bgPosX = (col / (COLS - 1)) * 100;
          const bgPosY = (row / (ROWS - 1)) * 100;
          
          return (
            <div key={pieceIndex} className="puzzle-slot">
              {(isOpened || isFlying) && (
                <motion.div
                  className={`puzzle-piece ${isFlying ? 'flying' : ''}`}
                  style={{
                    backgroundPosition: `${bgPosX}% ${bgPosY}%`
                  }}
                  initial={isFlying ? {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: '70px',
                    height: '70px',
                    x: '-50%',
                    y: '-50%',
                    zIndex: 9999,
                    borderRadius: '10px',
                    boxShadow: '0 0 30px rgba(209, 48, 84, 0.8)'
                  } : {}}
                  animate={isFlying ? {
                    position: 'absolute',
                    top: 0, left: 0, x: 0, y: 0,
                    width: '100%', height: '100%',
                    borderRadius: '0px',
                    boxShadow: '0 0 0px rgba(0,0,0,0)'
                  } : {}}
                  transition={isFlying ? {
                    duration: 1.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  } : {}}
                />
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default PuzzleBoard;
