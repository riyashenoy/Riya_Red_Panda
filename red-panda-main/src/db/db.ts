// db.ts
import Dexie, { Table } from 'dexie';
import { Exercise } from '../types/Exercise';
import { initExercises } from './initExercises';
import { initProgress } from './initProgress';

export interface ProgressRow {
	standard: string; // PK
	description: string;
  grade: number;
	lastStudied: Date; // index
	progress: number; // index, integer in range [0, 3]
}

export interface ExerciseRow {
	id: number; // PK
  standard: string; // FK to ProgressRow.standard
  exercise: Exercise;
}

export class SexEdDexie extends Dexie {
  progress!: Table<ProgressRow>; 
  exercises!: Table<ExerciseRow>; 

  constructor() {
    super('sexEdDB');

    this.version(3).stores({
      progress: '++standard, progress, lastStudied, grade, [progress+lastStudied], [progress+grade]',
      exercises: '++id, standard'
    });
  }
}

export const db = new SexEdDexie();

initExercises(db);
initProgress(db);
