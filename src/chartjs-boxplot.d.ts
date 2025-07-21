import 'chart.js';
import { BoxPlotChartOptions, BoxPlotDataset } from 'chartjs-chart-box-and-violin-plot';

declare module 'chart.js' {
  interface ChartTypeRegistry {
    boxplot: {
      chartOptions: BoxPlotChartOptions;
      datasetOptions: typeof BoxPlotDataset['defaultOptions'];
      defaultDataPoint: [number, number, number, number, number]; // min, q1, median, q3, max
    };
  }
}
