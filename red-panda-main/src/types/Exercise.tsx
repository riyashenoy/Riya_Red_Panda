type ExerciseBase = {
  type: string,
  data: Record<string, any>
  standard: string
}

type InteractionExercise = ExerciseBase & ({
  type: "INTERACTION",
  data: {
    target: "EXTERNAL_CONDOM"
  }
} | {
  type: "INTERACTION",
  data: {
    target: "PRACTICE_TALKING",
    prompt: string,
    hint: string,
    image?: string
  }
})

type MultipleChoiceExercise = ExerciseBase & {
  type: "MULTIPLE_CHOICE",
  data: {
    question: string,
    correctAnswer: string,
    distractors: string[]
  }
}

type SessionEndScreen = ExerciseBase & {
  type: "SESSION_COMPLETE",
  data: {
    score: number,
    message: string
  }
}

export type Exercise = InteractionExercise | MultipleChoiceExercise | SessionEndScreen
