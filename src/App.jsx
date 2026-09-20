import React, { useState, useEffect, useRef } from 'react';
import messagesData from './data/messages.json';
import { isDayUnlocked, calculateTimeRemaining } from './utils/dateLogic';
import musicFile from './assets/music.mp3';
import Envelope from './components/Envelope';
import PuzzleBoard from './components/PuzzleBoard';
import MessageModal from './components/MessageModal';
import IntroScreen from './components/IntroScreen';
import { Heart, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [openedDays, setOpenedDays] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [flyingPiece, setFlyingPiece] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('aya_opened_days');
    if (saved) {
      try {
        setOpenedDays(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved days");
      }
    }
    const savedTheme = localStorage.getItem('aya_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('aya_theme', newTheme);
  };

  const handleEnterIntro = () => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented"));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleOpenEnvelope = (message) => {
    if (!isDayUnlocked(message.id)) {
      const timeRemaining = calculateTimeRemaining(message.id);
      alert(`لسه ميعاد الرسالة دي مجاش يا حبيبتي! ❤️\nباقي عليها: ${timeRemaining}`);
      return;
    }
    setSelectedMessage(message);
    if (!openedDays.includes(message.id)) {
      const newOpened = [...openedDays, message.id];
      setOpenedDays(newOpened);
      localStorage.setItem('aya_opened_days', JSON.stringify(newOpened));
    }
  };

  const handleCloseModal = () => {
    if (selectedMessage) {
      setFlyingPiece(selectedMessage.pieceIndex);
      setSelectedMessage(null);
      setTimeout(() => setFlyingPiece(null), 2000); 
    }
  };

  const handleStartAudio = () => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log("Audio play failed:", e));
      }
    }
  };

  const handleFinishIntro = () => {
    setShowIntro(false);
  };

  const bonusMessages = messagesData.filter(m => m.isBonus);
  const regularMessages = messagesData.filter(m => !m.isBonus);

  const groupedByMonth = regularMessages.reduce((acc, msg) => {
    const safeDate = msg.date.replace(/-/g, '/');
    const date = new Date(safeDate);
    const month = date.toLocaleString('ar-EG', { month: 'long' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(msg);
    return acc;
  }, {});

  const regularOpenedDays = openedDays.filter(id => id >= 6);
  const progressPercentage = (regularOpenedDays.length / regularMessages.length) * 100;

  return (
    <div className="app-container">
      {showIntro && <IntroScreen onStartAudio={handleStartAudio} onFinish={handleFinishIntro} />}
      
      {/* Background Music. */}
      <audio ref={audioRef} loop src={musicFile}></audio>

      <header className="glass header">
        <div className="top-controls">
          <button className="icon-btn" onClick={toggleMute}>
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          <button className="icon-btn" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        <h1><Heart color="var(--primary-color)" fill="var(--primary-color)" /> إلى آية <Heart color="var(--primary-color)" fill="var(--primary-color)" /></h1>
        <p>365 يوم من الحب.. كل يوم رسالة وقطعة بتكمل صورتنا</p>
        
        <div className="progress-container">
          <div className="progress-text">الرسائل المفتوحة: {regularOpenedDays.length} / {regularMessages.length}</div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <div className="mailbox-section glass">
          <h2>صندوق الرسايل 💌</h2>
          <div className="months-container">
            {bonusMessages.length > 0 && (
              <div className="month-group bonus-group">
                <h3>رسائل بونص 🎁</h3>
                <div className="envelopes-grid">
                  {bonusMessages.map((msg) => (
                    <Envelope 
                      key={msg.id}
                      message={msg}
                      isOpened={openedDays.includes(msg.id)}
                      isUnlocked={isDayUnlocked(msg.id)}
                      onOpen={() => handleOpenEnvelope(msg)}
                    />
                  ))}
                </div>
              </div>
            )}
            {Object.entries(groupedByMonth).map(([monthName, msgs]) => (
              <div key={monthName} className="month-group">
                <h3>{monthName}</h3>
                <div className="envelopes-grid">
                  {msgs.map((msg) => (
                    <Envelope 
                      key={msg.id}
                      message={msg}
                      isOpened={openedDays.includes(msg.id)}
                      isUnlocked={isDayUnlocked(msg.id)}
                      onOpen={() => handleOpenEnvelope(msg)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="puzzle-section glass">
          <h2>صورتنا ❤️</h2>
          <PuzzleBoard 
            openedPieces={regularOpenedDays.map(id => id - 6)} 
            totalPieces={regularMessages.length}
            flyingPiece={flyingPiece}
          />
        </div>
      </div>

      {selectedMessage && (
        <MessageModal 
          message={selectedMessage} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;
