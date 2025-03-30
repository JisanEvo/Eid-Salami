import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const moneyNotes = [
  { value: 10, image: "/images/10tk.gif" },
  { value: 20, image: "/images/20tk.jpg" },
  { value: 50, image: "/images/50tk.gif" },
  { value: 100, image: "/images/100tk.jpg" },
  { value: 200, image: "/images/200tk.jpg" },
  { value: 500, image: "/images/500tk.jpg" },
  { value: 1000, image: "/images/1000tk.jpg" },
];

export default function EidSalamiApp() {
  const [salami, setSalami] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [bkashNumber, setBkashNumber] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [salami]);

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  };

  const giveSalami = () => {
    const randomSalami = moneyNotes[Math.floor(Math.random() * moneyNotes.length)];
    setSalami(randomSalami);
  };

  const handleClick = () => {
    if (!hasClicked) {
      giveSalami();
      playSong();
      setHasClicked(true);
    }
  };

  const handleTransfer = () => {
    if (!salami) {
      toast.error("সালামি নির্বাচিত হয়নি!");
      return;
    }
    if (bkashNumber.length === 11 && /^01[3-9]\d{8}$/.test(bkashNumber)) {
      toast.success(`৳${salami.value} টাকা সফলভাবে ট্রান্সফার হয়েছে!`);
      closeSalami();
    } else {
      toast.error("দয়া করে একটি বৈধ বিকাশ নম্বর দিন!");
    }
  };

  const closeSalami = () => {
    setSalami(null);
    setHasClicked(false);
    setBkashNumber("");
  };

  return (
    <div className="container">
      <Toaster />
      {!hasClicked && (
        <button className="salami-button" onClick={handleClick}>
          সালামি নিন
        </button>
      )}

      <audio ref={audioRef} src="/images/song.mp3" preload="auto" />

      {salami && (
        <div className="amount-display">
          <h3 className="eid-text">আপনার ঈদ বোনাস</h3>
          <img src={salami.image} alt={`${salami.value} Taka`} className="money-image" />
          <input 
            type="text" 
            placeholder="বিকাশ নম্বর দিন" 
            value={bkashNumber} 
            onChange={(e) => setBkashNumber(e.target.value)} 
            className="bkash-input"
            maxLength="11"
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <button className="salami-close transfer-button" onClick={handleTransfer}>
            ট্রান্সফার করুন
          </button>
        </div>
      )}
    </div>
  );
}
