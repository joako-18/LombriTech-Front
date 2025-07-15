declare module 'chartjs-chart-box-and-violin-plot';

import 'chartjs-chart-box-and-violin-plot';

declare module 'chart.js' {
  interface ChartTypeRegistry {
    boxplot: {
      chartOptions: any;
      datasetOptions: any;
      defaultDataPoint: any;
      parsedDataType: any;
      scales: keyof CartesianScaleTypeRegistry;
    };
    violin: {
      chartOptions: any;
      datasetOptions: any;
      defaultDataPoint: any;
      parsedDataType: any;
      scales: keyof CartesianScaleTypeRegistry;
    };
  }
}
