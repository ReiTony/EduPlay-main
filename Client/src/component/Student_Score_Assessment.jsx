import React, { useState, useEffect } from 'react';

function Student_Score_Assessment() {

    const [userPoints, setUserPoints] = useState(0);


    useEffect(() => {
        // Retrieve the USER_POINTS from sessionStorage
        const userPointsFromSession = JSON.parse(window.localStorage.getItem("USER_POINTS"));
        if (userPointsFromSession) {
            setUserPoints(parseInt(userPointsFromSession, 10));

            console.log(userPointsFromSession)

        }
    }, []);


    // To clear CURRENT_IMAGE_INDEX
    localStorage.removeItem("CURRENT_IMAGE_INDEX");
    // To clear CURRENT_MODULE
    localStorage.removeItem("CURRENT_MODULE");
    // To clear USER_POINTS from localStorage after (5 seconds)
    setTimeout(() => {
        localStorage.removeItem("USER_POINTS");
    }, 5000);



    return (

        <>
            <div>
                <div>
                    <h1>SCORE {userPoints}</h1>
                </div>
            </div>
        </>
    )
}

export default Student_Score_Assessment