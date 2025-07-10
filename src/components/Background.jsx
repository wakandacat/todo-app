import '../styles/background.css';

function Background() {

  return (
    <>
      <div id='fullBackground'>
        <svg className='blueBack' viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg">
            {/* filters for the blue background */}
            <defs>
                <filter id="f1" x="0" y="0">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="200" />
                </filter>
           </defs>
            <rect width="100%" height="100%" fill="blue" filter="url(#f1)"/> 

            {/* filters for the static background */}
            <defs>
                <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="blue" />
                    <stop offset="50%" stopColor="white" />
                    <stop offset="100%" stopColor="blue" />
                </linearGradient>

                <filter id="f2" x="0" y="0">
                    <feTurbulence type="Turbulence" baseFrequency="0.4" numOctaves="2" seed="5" stitchTiles="stitch" />
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="100" xChannelSelector="B"yChannelSelector="B" />           
                </filter>
            </defs>
            <rect width="100%" height="15%" y="-15%" fill="url(#grad1)" fillOpacity="20%" filter="url(#f2)">
                <animate attributeName="y" begin="0s "dur="6s" from="-15%" to="100%" repeatCount="indefinite" />
            </rect>
        </svg>
      </div>
    </>
  )
}

export default Background;