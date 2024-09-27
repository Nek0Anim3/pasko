"use client";

import { useBackButton } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

const BackButtonComponent = () => {
    const bb = useBackButton(true);

    useEffect(() => {
      if (bb) {
        bb.show();
      }
    }, [bb]);

    return null; // Не возвращаем никакого JSX, так как компонент только управляет логикой
}

export default BackButtonComponent;
