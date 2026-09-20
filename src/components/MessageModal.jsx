import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle } from 'lucide-react';
import './MessageModal.css';

const MessageModal = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className={`modal-content glass ${message.isSpecial ? 'special-message' : ''}`}
          initial={{ scale: 0.8, y: 50, rotateX: 45 }}
          animate={{ scale: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="modal-header">
            <h3>{message.title}</h3>
            <span className="modal-date">{message.date}</span>
          </div>
          
          <div className="modal-body">
            <p>{message.content}</p>
          </div>
          
          <div className="modal-footer">
            {message.pieceIndex !== null ? (
              <>
                <p className="puzzle-hint">اضغطي على القطعة عشان تكملي صورتنا</p>
                <motion.button 
                  className="puzzle-button"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Puzzle size={32} color="#fef0f3" />
                </motion.button>
              </>
            ) : (
              <motion.button 
                className="close-btn"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  background: 'var(--primary-color)', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '10px 30px', 
                  borderRadius: '25px',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                إغلاق
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageModal;
