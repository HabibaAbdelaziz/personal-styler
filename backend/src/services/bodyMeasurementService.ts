import { IBodyMeasurement } from "../types/bodyMeasurement";
import { BodyMeasurement } from "../models/BodyMeasurement";

//define an interface for the return type
interface MeasurementWithShape{
    measurement: IBodyMeasurement;
    bodyShape: string;
}
export class BodyMeasurementService {
    async addMeasurement(measureData: IBodyMeasurement): Promise<MeasurementWithShape> {
        try {
            console.log('Service: Creating measurement with data:', measureData);
            const measurement = new BodyMeasurement(measureData);
            const savedMeasurement = await measurement.save();
            console.log('Service: Measurement saved:', savedMeasurement);
            
            // call method to calc body shape
            const bodyShape = savedMeasurement.calculateBodyShape();

            return {
                measurement: savedMeasurement,
                bodyShape: bodyShape
            }
        } catch (error: any) {
            console.error('Service: Error creating measurement:', error);
            throw new Error(error.message);
        }
    }

    async updateMeasurement(measurementId: string, measureData: Partial<IBodyMeasurement>): Promise<IBodyMeasurement | null>{
        try{
            return await BodyMeasurement.findByIdAndUpdate(
                measurementId,
                measureData,
                { new: true}
            );
        } catch (error: any){
            throw new Error("Error with finidng and updating body measurements.");
        }
    }

    async getMeasurementHistory(stylePreferenceId: string): Promise<IBodyMeasurement[]> {
        try {
            return await BodyMeasurement.find({ stylePreferenceId}).sort({measuredAt: -1});
        } catch (error: any) {
            throw new Error("Error with getting body measurement history.");
        }
    }

    async getLatestMeasurement(stylePreferenceId: string): Promise<IBodyMeasurement | null> {
        try{
            return await BodyMeasurement.findOne({stylePreferenceId}).sort({measuredAt: -1});
        } catch (error: any){
            throw new Error("Error with getting latest body measurement.");
        }
    }


}