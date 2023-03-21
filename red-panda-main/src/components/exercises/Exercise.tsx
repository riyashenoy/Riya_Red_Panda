import { Exercise as ExerciseT } from "../../types/Exercise"
import { Condom } from "./Condom"
import { MultipleChoice } from "./MultipleChoice"
import { PracticeTalking } from "./PracticeTalking"
import { SessionEndScreen } from "./SessionEndScreen"

const InnerExercise = ({
  exercise,
  onExerciseDone
}: {
  exercise: ExerciseT
  onExerciseDone: (correct: boolean) => void
}) => {
  if (exercise.type === "INTERACTION") {
    if (exercise.data.target === "EXTERNAL_CONDOM") {
      return <Condom onExerciseDone={onExerciseDone} />
    } else if (exercise.data.target === "PRACTICE_TALKING") {
      return <PracticeTalking exercise={exercise} onExerciseDone={onExerciseDone} />
    } else {
      throw new Error(`"Unknown interaction type: ${(exercise.data as any).target}`);
    }
  } else if (exercise.type === "MULTIPLE_CHOICE") {
    return <MultipleChoice exercise={exercise} onExerciseDone={onExerciseDone} />
  } else if (exercise.type === "SESSION_COMPLETE") {
    return <SessionEndScreen score={exercise.data.score} message={exercise.data.message} />
  } else {
    throw new Error(`"Unknown exercise type: ${(exercise as any).type}`);
  }
}

export const Exercise = ({
  exercise,
  onExerciseDone
}: {
  exercise: ExerciseT,
  onExerciseDone: (correct?: boolean) => void
}) => (
  <>
    <InnerExercise exercise={exercise} onExerciseDone={onExerciseDone} />
  </>
)
