import './App.css';
import React,{ useEffect, useState} from 'react';

function App() {
        const [targetDate, setTargetDate] = useState('');
        const [count, setCount] = useState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        const[isCountActive, setIsCountActive] = useState(false);
        const[isCountOver, setIsCountOver] = useState(false);
        const[isOver100Days, setIsOver100Days] = useState(false);


        useEffect(() => {

          if(targetDate) {
            const now = new Date();
            const then = new Date(targetDate);
            const diff = then - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));


            if(days > 100) {
              setIsOver100Days(true);
              setIsCountActive(false);
              return;
            } else {
              setIsOver100Days(false);
              setIsCountActive(true);
            }

            const interval = setInterval(() => {

                const now = new Date();
                const then = new Date(targetDate);
                const diff = then - now;

                if(diff <= 0) {
                  clearInterval(interval);
                  setCount({ days: 0, hours: 0, minutes: 0, seconds: 0});
                  setIsCountOver(true);
                  setIsCountActive(false);
                } else {
                  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                  const hours = Math.floor((diff % (1000 * 60 * 60 * 24))/ (1000 * 60 * 60));
                  const minutes = Math.floor((diff % (1000 * 60 * 60))/ (1000 * 60));
                  const seconds =  Math.floor((diff % (1000 * 60))/ 1000);

                  setCount({ days, hours, minutes, seconds});
                  setIsCountOver(false);
                }

            }, 1000);

            return () => clearInterval(interval);
          }

        }, [targetDate]);
      
        const handleChange = (e) => {
           setTargetDate(e.target.value);
           setIsCountOver(false);
        };

        const handleDelete = () => {
          setTargetDate('');
          setCount({days: 0, hours: 0, minutes: 0, seconds: 0});
          setIsCountOver(false);
          setIsCountActive(false);
          setIsOver100Days(false);
        }

  return (
    <div className="App">

      <h1 className='heading'>Countdown <span className='highlight'>Timer</span></h1>
      <input type="datetime-local" value={targetDate} onChange={handleChange} className='input-field' />
       <button onClick={handleDelete}>
        {!isCountActive || isCountOver || isOver100Days ? "Start Timer" : "Cancel Timer"}
       </button>
       {isCountOver && (
        <div className='text-message'>
          🎉 The countdown is over! What's next on your adventure? 🎉
        </div>
       )}
       {isOver100Days && (
        <div className='text-message'>
           The selected time is more than 100 days from now.
        </div>
       )}
       {isCountActive && !isOver100Days && (
        <div className='countdown-container'>
          <div className='countdown-item'>
            <days>{count.days}</days>
             <span className='label'>Days</span>
          </div>

          <div className='countdown-item'>
            <hours>{count.hours}</hours>
             <span className='label'>Hours</span>
          </div>

          <div className='countdown-item'>
            <minutes>{count.minutes}</minutes>
             <span className='label'>Minutes</span>
          </div>

          <div className='countdown-item'>
            <seconds>{count.seconds}</seconds>
             <span className='label'>Seconds</span>
          </div>

        </div>
       )}
    </div>
  );
}

export default App;
