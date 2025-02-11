import mongoose, {Schema, Model} from "mongoose";
import { IBodyMeasurement, MEASUREMENT_RANGES } from "../types/bodyMeasurement";

const bodyMeasurementSchema = new Schema<IBodyMeasurement>({
    stylePreferenceId: {
        type: String,
        required: true, 
        ref: 'StylePreferenceId'
    },
    height: {
        type: Number, 
        required: true,
        min: MEASUREMENT_RANGES.height.min,
        max: MEASUREMENT_RANGES.height.max
    },
    weight: {
        type: Number, 
        required: true,
        min: MEASUREMENT_RANGES.weight.min,
        max: MEASUREMENT_RANGES.weight.max
    },
    age: {
        type: Number, 
        required: true,
        min: MEASUREMENT_RANGES.age.min,
        max: MEASUREMENT_RANGES.age.max
    },
    bust: {
        type: Number, 
        required: true,
        min: MEASUREMENT_RANGES.bust.min,
        max: MEASUREMENT_RANGES.bust.max
    },
    waist: {
        type: Number, 
        required: true,
        min: MEASUREMENT_RANGES.waist.min,
        max: MEASUREMENT_RANGES.waist.max
    },
    hips: {
        type: Number, 
        required: true,
        min: MEASUREMENT_RANGES.hips.min,
        max: MEASUREMENT_RANGES.hips.max
    },
    measuredAt: {
        type: Date,
        default: Date.now
    }   
});


// methods to calculate body shape based on measurements
bodyMeasurementSchema.methods.calculateBodyShape = function(): string {
    const bust = this.bust;
    const waist = this.waist;
    const hips = this.hips;

    // basic body shape calculation logic
    if (Math.abs(bust - hips) <= 2 && (bust - waist) >= 7) {
        return 'hourglass';
    } else if (bust > hips + 2 && (bust - waist) >= 7) {
        return 'inverted-triangle';
    } else if (hips > bust + 2 && (hips - waist) >= 7) {
        return 'pear';
    } else if (Math.abs(bust - hips) <= 2 && (bust - waist) < 7) {
        return 'rectangle';
    } else {
        return 'apple';
    }
};

export const BodyMeasurement: Model<IBodyMeasurement> = mongoose.model<IBodyMeasurement>('BodyMeasurement', bodyMeasurementSchema);