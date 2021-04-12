import { Timestamps } from "./Timestamps";

export interface Gig {
    company: string,
    pay: number,
    distance: number,
    time: number,
    store: string,
    timestamps: Timestamps,
    completed: boolean,
    completedDatabaseNum: number
}