import {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import BG from './bg-img.jpg';

function App() {
  const [expiryTime, setExpiryTime] = useState("6 may 2023 20:00:00");
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: "",
    countdownHours: "",
    countdownMinutes: "",
    countdownSeconds: "",
  });

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor(
        (remainingDayTime % (1000 * 60)) / 1000
      );
  
      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };
  
      setCountdownTime(runningCountdownTime);
  
      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(false);
      }
    }, 1000);
  };

  useEffect(() => {
    countdownTimer();
  });

  const timeStyles = {
    mx: 2,
    fontSize: '24px'
  }

  return (
    <Box sx={{backgroundImage: `url(${BG})`, backgroundSize: "cover",
    height: "100vh",
    color: "#f5f5f5"}}>
      <Container sx={{pt: 8}}>
        <Typography align="center" variant="h2">
          Hello Gorgeous! 
        </Typography>

        <Typography align="center" variant="subtitle1" sx={{my: 4}}>
          Your friendly, caring AI B-Bot here with an auto countdown for you 😁 
        </Typography>
        <Typography align="center" variant="subtitle1" sx={{mb: 4}}>
          I hope you enjoy and I will see you Saturday!! 😚
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="center" sx={{border: 'solid', borderColor: 'white', py: 8, px: 4, mx: 'auto', width: 3/5, opacity: 0.6}}>
          <Stack>
          <Typography variant="p" sx={timeStyles}>
            {countdownTime.countdownDays} Days
          </Typography>
          <Typography variant="p" sx={{...timeStyles, mt: 5}}>
            {countdownTime.countdownMinutes} Minutes
          </Typography>
          </Stack>

          <Stack>
          <Typography variant="p" sx={timeStyles}>
            {countdownTime.countdownHours} Hours
          </Typography>

          <Typography variant="p" sx={{...timeStyles, mt: 5}}>
            {countdownTime.countdownSeconds} Seconds
          </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
