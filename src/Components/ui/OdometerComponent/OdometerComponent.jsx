import { useEffect, useRef } from 'react';
import Odometer from 'odometer';
import "odometer/themes/odometer-theme-minimal.css";
import "./OdometerComponent.module.css";

const OdometerComponent = ({ value }) => {
  const odometerRef = useRef(null);
  const odometerInstance = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && odometerRef.current) {
      if (!odometerInstance.current) {
        // Создаем одометр только один раз
        odometerInstance.current = new Odometer({
          el: odometerRef.current,
          value: 0,
          theme: "minimal",
          format: '(,ddd).dd', // Добавьте здесь формат с десятичными числами
        });
      }
      // Обновляем значение одометра
      odometerInstance.current.update(value);
    }
  }, [value]);

  return <div ref={odometerRef} className="odometer" />;
};

export default OdometerComponent;
