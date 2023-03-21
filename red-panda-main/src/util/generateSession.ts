import { db } from "../db/db";
import { Exercise } from "../types/Exercise";
import { shuffle } from "./shuffle";

export const generateSession = async ({
  grade,
  numberOfExercises,
  numberNewTopics
}: {
  grade: number,
  numberOfExercises: number,
  numberNewTopics: number
}) => {
  const progress3Late = await db.progress.where(["progress", "lastStudied"]).between([3, -Infinity], [3, Date.now() - 1000 * 60 * 60 * 24 * 14], true, true).limit(3).toArray()
  const progress2Late = await db.progress.where(["progress", "lastStudied"]).between([2, -Infinity], [2, Date.now() - 1000 * 60 * 60 * 24 * 3], true, true).limit(3).toArray()
  const progress1Late = await db.progress.where(["progress", "lastStudied"]).between([1, -Infinity], [1, Date.now() - 1000 * 60 * 60 * 24 * 1], true, true).limit(3).toArray()
  const newStandards = await db.progress.where(["progress", "grade"]).between([0, 0], [0, grade], true, true).limit(numberNewTopics).toArray()
  
  const standardsToStudy = shuffle([
    ...progress3Late,
    ...progress2Late,
    ...progress1Late,
    ...newStandards
  ]);

  const exercises: Exercise[] = [];
  let standardIndex = 0
  while (exercises.length < numberOfExercises && standardIndex < standardsToStudy.length) {
    const standard = standardsToStudy[standardIndex]
    const exercisesInStandard = await db.exercises.where("standard").equals(standard.standard).limit(numberOfExercises - exercises.length).toArray()
    exercisesInStandard.forEach((exercise, index) => {
      exercises.push(exercise.exercise)
    })
    ++standardIndex;
  }

  return exercises;
}
