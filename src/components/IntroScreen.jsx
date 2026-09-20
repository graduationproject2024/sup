import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import './IntroScreen.css';

const IntroScreen = ({ onEnter }) => {
  const [show, setShow] = useState(true);

  const handleEnter = () => {
    setShow(false);
    setTimeout(onEnter, 1000); // Wait for fade out
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="intro-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 1 }}
        >
          {/* Floating Hearts Background */}
          <div className="floating-hearts">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="heart-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 5 + 5}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                <Heart size={Math.random() * 20 + 10} color="var(--primary-color)" fill="var(--primary-color)" opacity={0.3} />
              </div>
            ))}
          </div>

          <motion.div 
            className="intro-content glass"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1>إلى آية</h1>
            <p className="intro-quote">"أنتِ أجمل صدفة في حياتي، وأغلى نعمة ربنا رزقني بيها."</p>
            <p className="intro-sub">365 يوم من الحب بانتظارك...</p>
            
            <motion.button 
              className="enter-btn"
              onClick={handleEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأي الرحلة ❤️
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
