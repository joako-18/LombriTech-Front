export interface SensorData {
ph:number;
turbidez:number;
humedad:number;
}

export interface SensorDataResponse {
    timestamp: string;
    datos: SensorData;
}