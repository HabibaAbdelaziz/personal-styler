import { Document } from "mongoose";
export interface IBodyMeasurement extends Document{
    id?: string;
    stylePreferenceId: string;
    height: number;
    weight: number;
    age: number;
    bust: number;
    waist: number;
    hips: number;
    measuredAt?: Date;
    calculateBodyShape(): string;
}

//for validation aand type checking
export interface MeasurementRanges {
    min: number;
    max: number;
}

export const MEASUREMENT_RANGES: Record<string, MeasurementRanges> = {
    height: {min: 130, max: 230}, //cm
    weight: {min: 30, max: 200}, //kilos
    age: {min: 10, max: 130}, //yrs
    bust: {min: 50, max: 200 }, //cm
    waist: {min:40, max: 200}, //cm
    hips: {min:50, max: 200} //cm

}