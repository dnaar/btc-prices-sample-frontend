import { useEffect, useState } from "react";
import "./App.css";
import { getBTCData } from "./services/btc";
import ChartComponent from "./components/chart";
import { BtcInfo } from "./interfaces/btc";

function App() {
  const [btcData, setBtcData] = useState<BtcInfo[] | null>(null);

  useEffect(() => {
    getBTCData().then((response) => setBtcData(response));
  }, []);

  return (
    <>
      <h1>BTC Price</h1>
      <div className="card">
        <ChartComponent btcData={btcData}></ChartComponent>
      </div>
    </>
  );
}

export default App;
