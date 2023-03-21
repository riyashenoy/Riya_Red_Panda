import { STANDARDS } from "../constants/Standards"
import { SexEdDexie } from "./db"

export const initProgress = async (db: SexEdDexie) => {
  if (await db.progress.count() === 0) {
    await Promise.all(STANDARDS.map((standard, index) => (
      db.progress.add({
        ...standard,
        progress: 0,
        lastStudied: new Date(0)
      })
    )))
  }
}
