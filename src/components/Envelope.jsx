import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import './Envelope.css';

const Envelope = ({ message, isOpened, isUnlocked, onOpen }) => {
  return (
    <div 
      className={`envelope-wrapper ${isUnlocked ? 'unlocked' : 'locked'} ${isOpened ? 'opened' : ''}`}
      onClick={onOpen}
    >
      <motion.div 
        className="envelope"
        whileHover={isUnlocked && !isOpened ? { scale: 1.05, y: -5 } : {}}
        whileTap={isUnlocked && !isOpened ? { scale: 0.95 } : {}}
      >
        <div className="envelope-back"></div>
        <div className="envelope-paper">
          <div className="paper-content">
            <span className="heart-icon">❤️</span>
          </div>
        </div>
        <div className="envelope-front"></div>
        <div className="envelope-flap"></div>
        
        {!isUnlocked && (
          <div className="lock-icon">
            <Lock size={20} color="var(--text-light)" opacity={0.6} />
          </div>
        )}
      </motion.div>
      <div className="envelope-date">
        {message.monthDay}
      </div>
    </div>
  );
};

export default Envelope;
