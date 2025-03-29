import React, { useRef, useState } from "react";
import "./App.css";

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
  const [hasClicked, setHasClicked] = useState(false);  // Track if button is clicked
  const audioRef = useRef(null);

  // Function to handle the button click and play the audio
  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.play();  // Play the song
    }
  };

  // Function to handle giving the salami
  const giveSalami = () => {
    const randomSalami = moneyNotes[Math.floor(Math.random() * moneyNotes.length)];
    setSalami(randomSalami);
  };

  // Function to handle button click for both actions (giving salami and playing song)
  const handleClick = () => {
    if (!hasClicked) {  // Only allow the action if button hasn't been clicked yet
      giveSalami();  // Give random salami
      playSong();    // Play the song
      setHasClicked(true);  // Mark the button as clicked
    }
  };

  // Function to stop the song and reset the state
  const closeSalami = (event) => {
    event.preventDefault();  // Prevent any default behavior like page refresh
    if (audioRef.current) {
      audioRef.current.pause();  // Stop the song
      audioRef.current.currentTime = 0; // Reset song to the beginning
    }
    setSalami(null);  // Reset salami state to hide the image
    setHasClicked(false);  // Allow button to be clicked again
  };

  return (
    <div className="container">
      {/* Button to trigger both salami giving and song playing, it hides after clicked */}
      {!hasClicked && (
        <button className="salami-button" onClick={handleClick}>
          সালামি নিন
        </button>
      )}

      {/* Audio element to play the song */}
      <audio ref={audioRef} src="/images/song.mp3" />

      {/* Display the salami amount and image if a salami is given */}
      {salami && (
        <div className="amount-display">
          <img src={salami.image} alt={`${salami.value} Taka`} className="money-image" />
          {/* Button to close salami display, stop the song, and reset the state */}
          <button className="salami-close" onClick={closeSalami}>
            ঈদ মোবারক
          </button>
        </div>
      )}
    </div>
  );
}
