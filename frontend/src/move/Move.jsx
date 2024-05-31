import React, { useState, useEffect } from 'react';
import './move.css'; // Import the CSS file directly
import Menu from '../Menu';
function Move() {
    const [launch, setLaunch] = useState(false);

    const launchRocket = () => {
        setLaunch(true);
    };

    const handleAnimationEnd = () => {
        if (launch == true) {
            setLaunch(false);
        }
        else {
            setLaunch(true)
        }


    };

    return (
        <div>
            <div className="relative cont bg-gray-300 flex flex-col items-center ">
             <div className=''>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
                <div className='thegrid'>

                    
                        <img
                            className={launch ? 'rocket roc0 rocket-animation ' : 'roc0 rocket rocket-animation00 '}
                            id="rocket"
                            src="src/move/autel-drones-prime-day-2022.png"  // Ensure the path is correct
                            alt="Rocket"
                            onAnimationEnd={handleAnimationEnd} // Handle animation end event
                        />
                    
                        <img
                            className={launch ? 'rocket1 roc1 rocket-animation1 ' : 'rocket1 roc1 rocket-animation11 '}
                            id="rocket"
                            src="src/move/PHOTO-drone.jpg"  // Ensure the path is correct
                            alt="Rocket"
                            onAnimationEnd={handleAnimationEnd} // Handle animation end event
                        />


                        <img
                            className={launch ? 'rocket roc2 rocket-animation ' : 'rocket roc2 rocket-animation00 '}
                            id="rocket"
                            src="src/move/computer-2982270_1280.jpg"  // Ensure the path is correct
                            alt="Rocket"
                            onAnimationEnd={handleAnimationEnd} // Handle animation end event
                        />
                      <img
                            className='rocket  roc3  '
                            id="rocket"
                            src="src/move/Nikon-Z-fc-1.jpg"  // Ensure the path is correct
                            alt="Rocket"
                            onAnimationEnd={handleAnimationEnd} // Handle animation end event
                        />
                        <img
                            className='rocket  roc4  '
                            id="rocket"
                            src="src/move/autel-drones-prime-day-2022.png"  // Ensure the path is correct
                            alt="Rocket"
                            onAnimationEnd={handleAnimationEnd} // Handle animation end event
                        />
                        <img
                            className='roc5'
                            id="rocket"
                            src="src/move/depositphotos_310577288-stock-photo-varna-bulgaria-august-13-2019.jpg"  // Ensure the path is correct
                            alt="Rocket"
                            onAnimationEnd={handleAnimationEnd} // Handle animation end event
                        />

                </div>
                <div className='left_cadre'> </div>
                    <div className='right_cadre'> </div>
                </div>
            </div>
            <div className='hide'>

            </div>
        </div>

    );
}

export default Move;
