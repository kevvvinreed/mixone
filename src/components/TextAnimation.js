import { useMemo } from 'react';
import './TextAnimation.css';
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
const TextAnimation = props => {
  useMemo(async () => {
    let counter = 0;
    let flag = true;
    while (flag) {
      await sleep(300);

      try {
        for (let i = 1; i < 6; i++) {
          document.querySelector(`#t${i}`).style.opacity = 1;
          document.querySelector(`#b${i}`).style.opacity = 1;

          await sleep(300);
        }
        document.querySelector(`#core`).style.opacity = 1;

        for (let i = 1; i < 6; i++) {
          document.querySelector(`#t${i}`).style.opacity = 0;
          document.querySelector(`#b${i}`).style.opacity = 0;
          await sleep(300);
        }
        document.querySelector(`#core`).style.opacity = 0;
      } catch (TypeError) {
        flag = false;
      }
    }
  }, []);

  return (
    <>
      <div className="text-container">
        <span
          id="t1"
          className="text-fragment-top outline"
          style={{ opacity: 0 }}
        >
          mixone sound
        </span>
        <span id="t2" className="text-fragment-top" style={{ opacity: 0 }}>
          mixone sound
        </span>
        <span id="t3" className="text-full outline" style={{ opacity: 0 }}>
          mixone sound
        </span>
        <span
          id="t4"
          className="text-fragment-top outline"
          style={{ opacity: 0 }}
        >
          mixone sound
        </span>
        <span id="t5" className="text-fragment-top" style={{ opacity: 0 }}>
          mixone sound
        </span>

        <span id="core" className="text-full" style={{ opacity: 0 }}>
          mixone sound
        </span>

        <span id="b5" className="text-fragment-bottom" style={{ opacity: 0 }}>
          mixone sound
        </span>
        <span
          id="b4"
          className="text-fragment-bottom outline"
          style={{ opacity: 0 }}
        >
          mixone sound
        </span>
        <span id="b3" className="text-full outline" style={{ opacity: 0 }}>
          mixone sound
        </span>
        <span id="b2" className="text-fragment-bottom" style={{ opacity: 0 }}>
          mixone sound
        </span>
        <span
          id="b1"
          className="text-fragment-bottom outline"
          style={{ opacity: 0 }}
        >
          mixone sound
        </span>
      </div>
    </>
  );
};

export default TextAnimation;
