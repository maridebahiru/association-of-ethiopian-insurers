import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

export default function BlurText({ text, delay = 200, className = '' }) {
  const words = text.split(' ');
  const [inView, setInView] = useState(false);

  return (
    <p 
      className={`flex flex-wrap ${className}`}
      ref={(el) => {
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }, { threshold: 0.1 });
        observer.observe(el);
      }}
    >
      {words.map((word, index) => {
        const spring = useSpring({
          filter: inView ? 'blur(0px)' : 'blur(10px)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translate3d(0,0px,0)' : 'translate3d(0,10px,0)',
          delay: index * delay,
          config: { tension: 120, friction: 14 }
        });

        return (
          <animated.span key={index} style={spring} className="inline-block mr-2 md:mr-3">
            {word}
          </animated.span>
        );
      })}
    </p>
  );
}
