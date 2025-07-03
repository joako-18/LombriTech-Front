export interface SensorData {
ph:number;
turbidez:number;
humidity:number;
}

export interface SensorDataResponse {
    timestamp: string;
    data: SensorData;
}