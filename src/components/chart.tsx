import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BtcInfo } from "../interfaces/btc";
import { chartSeries } from "../interfaces/chart";

interface ChartComponentProps {
  btcData: BtcInfo[] | null;
}

function ChartComponent({ btcData }: ChartComponentProps) {
  const [series, setSeries] = useState<chartSeries[] | null>(null);
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  useEffect(() => {
    if (!btcData) return;
    const btcSeriesData = btcData.map((entry) => [
      entry.timestamp * 1000,
      entry.price,
    ]);
    setSeries([
      {
        name: "BTC",
        data: btcSeriesData,
      },
    ]);
  }, [btcData]);
  const yFormatter = (val: number) => val.toFixed(3);
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      stacked: false,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 1,
    },
    fill: {
      colors: ["#F44336"],
    },
    yaxis: {
      labels: {
        formatter: yFormatter,
      },
      title: {
        text: "Price [USD]",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: yFormatter,
      },
    },
    theme: {
      mode: getCurrentTheme() ? "dark" : "light",
    },
  };
  if (!series) return <></>;
  return <ReactApexChart options={options} series={series}></ReactApexChart>;
}

export default ChartComponent;
