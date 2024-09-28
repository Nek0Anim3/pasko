import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

// Анимация для плавного скролла текста
const scrollAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(-40%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const ScrollingText = ({ nick }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const textWidth = textRef.current.scrollWidth;

    // Активируем анимацию только если текст не помещается в контейнер
    if (textWidth > containerWidth) {
      setShouldScroll(true);
    } else {
      setShouldScroll(false);
    }
  }, [nick]); // Срабатывает при изменении текста

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        position: 'relative',
        width: '50vw', // Ширина контейнера
        height: '5vh', // Высота контейнера
        overflow: 'hidden',
        backgroundColor: '#1b1919', // Цвет фона контейнера
      }}
    >
      <Typography
        ref={textRef}
        sx={{
          whiteSpace: 'nowrap',
          animation: shouldScroll ? `${scrollAnimation} 20s linear infinite` : 'none',
          fontSize: '26px'
        }}
      >
        {nick}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          width: '30px',
          height: '100%',
          background: 'linear-gradient(to left, rgba(27, 25, 25, 1), rgba(240, 240, 240, 0))',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default ScrollingText;
