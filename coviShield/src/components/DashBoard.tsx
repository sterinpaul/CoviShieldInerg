import { Content } from "antd/es/layout/layout";
import { theme } from "antd";
import StateFilter from "./StateFilter";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import PieChart from "./PieChart";
import TimeSeriesChart from "./TimeSeriesChart";
import MapView from "./MapView";


export function DashBoard() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { selectedState } = useSelector((state: RootState) => state.covid);

  return (
    <Content style={{ padding: '20px' }}>
      <div
        style={{
          padding: 24,
          minHeight: '100vh',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <blockquote className="pl-4 text-amber-950 font-bold text-xl">Wondering how your state is doing in the fight against COVID-19 ?</blockquote>
        <p className="my-6 indent-12">Stay informed with real-time data on <span className="font-bold">COVID-19</span> cases across Indian states. This interactive dashboard visualizes key statistics including total cases, active cases, recoveries, and deaths, state by state. With an easy-to-use map interface and state-wise filtering, users can quickly view current trends and hotspot regions. This tool provides a clear and accessible overview of the pandemic situation in India.</p>
        
        <StateFilter />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center overflow-scroll no-scrollbar">
            <h2 className="text-xl font-semibold">Statistics for {selectedState}</h2>
            <PieChart />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center overflow-scroll no-scrollbar">
            <h2 className="text-xl font-semibold mb-4">Trends Analysis</h2>
            <TimeSeriesChart />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Map View</h2>
          <MapView />
        </div>
      </div>
    </Content>
  );
}