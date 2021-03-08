import { Timestamps } from "./Timestamps";

export interface CurrentGig {
    company: string,
    pay: number,
    distance: number,
    time: number,
    store: string,
    timestamps: Timestamps
}