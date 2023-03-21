import { Exercise } from "../types/Exercise"
import { SexEdDexie } from "./db"

const exercises: Exercise[] = [
  {
    type: "MULTIPLE_CHOICE",
    standard: "SH.5.CC.1",
    data: {
      question: "Pregnancy can result from Vaginal intercourse",
      correctAnswer: "TRUE",
      distractors: ["FALSE"]
    }
  },
  {
    type: "MULTIPLE_CHOICE",
    standard: "CHR.5.IC.1",
    data: {
      question: "You should ask for consent before...",
      correctAnswer: "ALL OF THE ABOVE",
      distractors: ["HOLDING HANDS", "KISSING", "HAVING SEX"]
    }
  },
  {
    type: "INTERACTION",
    standard: "CHR.5.IC.1",
    data: {
      target: "PRACTICE_TALKING",
      prompt: "You just met someone new, and they keep touching you casually in a way you're not comfortable with. What could you say to communicate your boundaries?",
      hint: "Here's a phrase you can use: \"Please stop, I don't like that.\""
    }
  },
  {
    type: "MULTIPLE_CHOICE",
    standard: "SH.10.CC.1",
    data: {
      question: "What does Plan B do?",
      correctAnswer: "PREVENTS OVULATION",
      distractors: ["KILLS SPERM", "CAUSES ABORTION"]
    }
  },
  {
    type: "INTERACTION",
    standard: "SH.8.SM.1",
    data: {
      target: "EXTERNAL_CONDOM"
    }
  }
]

export const initExercises = async (db: SexEdDexie) => {
  if (await db.exercises.count() === 0) {
    await Promise.all(exercises.map((exercise, index) => (
      db.exercises.add({
        id: index,
        standard: exercise.standard,
        exercise
      })
    )))
  }
}
