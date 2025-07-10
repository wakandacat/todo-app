import '../styles/background.css';
import React, { useEffect, useState } from 'react';

function Background() {

  const [randInterval, setRandInterval] = useState(Math.floor(Math.random() * 10) + 4);

  //create random static effect
  // useEffect(() => {
  //   setInterval(() => {
  //       setRandInterval(Math.floor(Math.random() * 10) + 4);
  //   }, 1000);
  // });

  return (
    <>
      <div id='fullBackground'>
        <svg className='blueBack' viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg">
            {/* filters for the blue background */}
            <defs>
                <filter id="f1" x="0" y="0">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="200" result='blurred' />
                    <feTurbulence type="turbulence" baseFrequency="0.6" numOctaves="2" seed="5" stitchTiles="stitch" />
                    <feBlend in="blurred" in2="turbulence" mode="multiply" />
                </filter>
           </defs>
            <rect width="100%" height="100%" fill="rgb(2, 79, 117)" filter="url(#f1)"/> 

            {/* filters for the static background */}
            <defs>
                <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(2, 79, 117)"/>
                    <stop offset="50%" stopColor="white" />
                    <stop offset="100%" stopColor="rgb(2, 79, 117)"/>
                </linearGradient>

                <filter id="f2" x="0" y="0">
                    <feTurbulence type="turbulence" baseFrequency="0.4" numOctaves="2" seed="5" stitchTiles="stitch" />
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="100" xChannelSelector="B"yChannelSelector="B" />           
                </filter>
            </defs>
            <rect width="100%" height="15%" y="-15%" fill="url(#grad1)" fillOpacity="20%" filter="url(#f2)">
                <animate attributeName="y" begin="0s" dur={`${randInterval}s`} from="-15%" to="100%" repeatCount="indefinite" />
            </rect>
        </svg>
      </div>
    </>
  )
}

export default Background;