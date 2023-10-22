import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grade1AssessmentModule from '../Student_Data/Grade_1_game_module/Grade_1_Assessment_module.json';
import Grade2AssessmentModule from '../Student_Data/Grade_2_game_module/Grade_2_Assessment_module.json';
import Grade3AssessmentModule from '../Student_Data/Grade_3_game_module/Grade_3_Assessment_module.json';

function Student_Game_FourPicsOneWord() {
    // Initialize React hooks and get values from local storage
    const navigate = useNavigate();
    const [iframeSrc, setIframeSrc] = useState('');
    const [answer, setAnswer] = useState('');
    const [points, setPoints] = useState(0);
    const quizModuleTitle = JSON.parse(window.localStorage.getItem('QUIZ_MODULE_TITLE'));
    const gradeLevel = JSON.parse(window.localStorage.getItem('gradeLevel'));

    // Get the saved current module and image index from local storage
    const savedModule = localStorage.getItem('CURRENT_MODULE');
    const savedImageIndex = localStorage.getItem('CURRENT_IMAGE_INDEX');

    // Initialize state to track the current module and image index
    const [currentModule, setCurrentModule] = useState(savedModule || null);
    const [currentIndex, setCurrentIndex] = useState(savedImageIndex ? Number(savedImageIndex) : 0);

    // Initialize a variable to hold the selected assessment module based on gradeLevel
    let assessmentModule;

    if (gradeLevel === 1) {
        assessmentModule = Grade1AssessmentModule;
    } else if (gradeLevel === 2) {
        assessmentModule = Grade2AssessmentModule;
    } else if (gradeLevel === 3) {
        assessmentModule = Grade3AssessmentModule;
    } else {
        // Default None if gradeLevel doesn't match expected values
    }

    // Use useEffect to store the current module and image index in local storage
    useEffect(() => {
        localStorage.setItem('CURRENT_MODULE', currentModule);
        localStorage.setItem('CURRENT_IMAGE_INDEX', currentIndex);
    }, [currentModule, currentIndex]);

    // Use useEffect to load the current image when the component mounts
    useEffect(() => {
        if (assessmentModule) {
            const matchedModule = assessmentModule.find((module) => module.title === quizModuleTitle);

            if (matchedModule) {
                // Set the current module
                setCurrentModule(matchedModule.title);

                if (matchedModule.modules[0].images.length > 0) {
                    const currentImage = matchedModule.modules[0].images[currentIndex];
                    setIframeSrc(currentImage.imagePath);
                }
            }
        }
    }, [assessmentModule, quizModuleTitle, currentIndex]);

    // Handle input change for the answer
    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };

    // Handle moving to the next image and checking the answer
    const handleNextImage = () => {
        if (isAnswerCorrect(answer)) {
            // Update points, move to the next image, and clear the answer
            setPoints(points + 1);
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setAnswer('');

            // Calculate the total number of images based on the current module
            const matchedModule = assessmentModule.find((module) => module.title === quizModuleTitle);

            if (matchedModule) {
                const totalItems = matchedModule.modules[0].images.length;

                console.log('currentIndex:', currentIndex);
                console.log('totalItems:', totalItems);

                if (currentIndex + 1 === totalItems) {
                    // If all images shown, navigate to the score page
                    console.log('Navigating to Score');
                    navigate('/Student/Assessment/4-pics-1-word/Score');
                }
            }

            window.localStorage.setItem('USER_POINTS', points + 1);
        }
    };

    // Check if the provided answer is correct
    const isAnswerCorrect = (userAnswer) => {
        if (assessmentModule) {
            const matchedModule = assessmentModule.find((module) => module.title === quizModuleTitle);
            if (matchedModule && matchedModule.modules[0].images[currentIndex]) {
                const correctAnswer = matchedModule.modules[0].images[currentIndex].answer.toLowerCase();
                return userAnswer.trim().toLowerCase() === correctAnswer;
            }
        }
        return false;
    };

    return (
        <>
            <div className="bg-[#fff5be] rounded-3xl p-4 m-4">
                <div className="flex flex-col items-center text-2xl h-[80vh]">
                    <div className="p-2 mb-4 text-2xl font-bold">
                        <h1>{quizModuleTitle}</h1>
                    </div>
                    <div className='h-[650px] w-[650px]'>
                        <iframe src={iframeSrc} width="100%" height="100%" allowFullScreen allow="autoplay"></iframe>
                    </div>
                    <div>
                        <label htmlFor="answer" className="font-semibold">
                            Enter your answer:
                        </label>
                        <input
                            type="text"
                            id="answer"
                            name="answer"
                            value={answer}
                            onChange={handleAnswerChange}
                            className="w-full p-2 mt-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button className="p-2 m-2 font-semibold text-white bg-black rounded" onClick={handleNextImage}>SUBMIT</button>

                </div>
            </div>
        </>
    );
}

export default Student_Game_FourPicsOneWord;
