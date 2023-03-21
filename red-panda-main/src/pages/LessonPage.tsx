import { Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Exercise } from "../components/exercises/Exercise";
import { Exercise as ExerciseT } from "../types/Exercise";
import { ProgressBar } from "../components/ProgressBar"
import { Lesson } from "../types/Lesson";
import { generateSession } from "../util/generateSession";
import { DARK_RED, GREEN, LIGHT_GREY } from '../constants/Colors';

import "./LessonPage.css"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Drawer } from "../components/Drawer";

const getSessionEndScreen = (score: number) => {
  const isDiagnostic = window.location.search.indexOf("diagnostic") >= 0;
  return { type: "SESSION_COMPLETE", standard: "NONE", data: { score, message: isDiagnostic ? "Let's start learning!" : "You learned 3 new concepts!" } } as ExerciseT
}

export const LessonPage = () => {
  const [lesson, setLesson] = useState<Lesson>({ exercises: [] });
  const [lessonLoaded, setLessonLoaded] = useState(false);

  const navigate = useNavigate()

  const [activeExercise, setActiveExercise] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [showIncorrectDrawer, setShowIncorrectDrawer] = useState(false);
  const [showCorrectDrawer, setShowCorrectDrawer] = useState(false);

  const nextExercise = useCallback(() => {
    setAnswered(true)
    setProgress(progress => progress + 1)
    setTimeout(() => {
      setShowCorrectDrawer(false);
      setShowIncorrectDrawer(false);
      setAnswered(false)
      setActiveExercise(activeExercise => activeExercise + 1)
    }, 500)
  }, [])

  const onExerciseDone = useCallback((correct?: boolean) => {
    if (correct) {
      const score = (numCorrect + 1) / (lesson.exercises.length - 1);
      console.log(score)
      setLesson({ exercises: [
        ...lesson.exercises.splice(0, lesson.exercises.length - 1),
        getSessionEndScreen(score)
      ]})
      setNumCorrect(numCorrect + 1)
      setShowCorrectDrawer(true);
      setShowIncorrectDrawer(false);
    } else {
      setShowCorrectDrawer(false);
      setShowIncorrectDrawer(true);
    }
  }, [lesson.exercises, numCorrect])

  useEffect(() => {
    (async () => {
      const exercises = await generateSession({grade: 12, numberOfExercises: 5, numberNewTopics: 4 })
      const isDiagnostic = window.location.search.indexOf("diagnostic") >= 0;
      const filteredExercises = isDiagnostic ? exercises.filter(exercise => exercise.type !== "INTERACTION") : exercises
      setLesson({
        exercises: [...filteredExercises, getSessionEndScreen(0) ]
      });
      setLessonLoaded(true)
    })();
  }, [])

  return (
    <>
      <Flex direction="column" height="100vh" padding="53px">
        <>
          <ProgressBar target={lesson.exercises.length - 1} value={progress} />
          <Flex direction="column" flexGrow="1" className={answered ? "slideOutToLeft" : "slideInFromRight"}>
            <>
              {
                lessonLoaded
                ? (
                  lesson.exercises[activeExercise]
                  ? <Exercise exercise={lesson.exercises[activeExercise]} onExerciseDone={onExerciseDone} />
                  : navigate("/")
                ) : null
              }
            </>
          </Flex>
        </>
      </Flex>
      {
        showIncorrectDrawer
        ?
        <Drawer 
          className={answered ? "slideOutToLeft" : "slideInFromBottom"}
          icon={<CloseIcon width='80px' height='80px' color={DARK_RED}/>} 
          title ="uh oh" 
          text={`The correct answer was "${lesson.exercises[activeExercise].data.correctAnswer.toLowerCase()}"`} 
          color={DARK_RED}
          background={LIGHT_GREY} 
          onClick={() => nextExercise()}
        /> 
        : null
      }
      {
        showCorrectDrawer
        ?
        <Drawer
          className={answered ? "slideOutToLeft" : "slideInFromBottom"}
          icon={<CheckIcon width='80px' height='80px' color={GREEN}/>} 
          title ="Nice!" 
          text="You're getting the hang of this!" 
          color={GREEN}
          background={LIGHT_GREY}
          onClick={() => nextExercise()}
        /> 
        : null
      }
    </>
  )
}
