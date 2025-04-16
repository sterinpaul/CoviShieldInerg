import { NavBar } from "../components/NavBar"
import { DashBoard } from "../components/DashBoard"
import Layout, { Footer } from "antd/es/layout/layout"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import baseURL from "../api/baseUrl"
import { setCovidData, setCurrentCovidData } from "../redux/covidSlice"
import jsonData from "../assets/data.json";

const covidData = jsonData.covidData;
const stateCoordinates: Record<string, number[]> = jsonData.stateCoordinates;

export type RawCovidDataRow = [
    string, // id
    string, // state name
    string | number, // active
    string | number, // total
    string | number, // recovered
    string | number // deaths
];

type StructuredCovidData = {
    id: string;
    state: string;
    activeCases: number;
    totalCases: number;
    recovered: number;
    deaths: number;
    latitude: number;
    longitude: number;
};

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        getCovidData()
    }, [])

    const structureData = (data: RawCovidDataRow[]): StructuredCovidData[] => {
        return data.filter(([_, state]) => state !== "Total").map(([id, state, active, total, recovered, deaths]) => ({
            id,
            state,
            activeCases: Number(active),
            totalCases: Number(total),
            recovered: Number(recovered),
            deaths: Number(deaths),
            latitude: stateCoordinates[state]?.[0] || 0,
            longitude: stateCoordinates[state]?.[1] || 0
        }));
    };

    const getCovidData = async () => {
        try {
            const response = await baseURL.get("/");
            if (response) {
                const { data } = response.data
                const structuredData = structureData(data)
                dispatch(setCovidData(structuredData));
                dispatch(setCurrentCovidData(structuredData));
            }

        } catch (error) {
            console.log("Error fetching data from public api. Dummy data added");
            const data = structureData(covidData as RawCovidDataRow[]);
            dispatch(setCovidData(data));
            dispatch(setCurrentCovidData(data));
        }
    };

    return (
        <Layout>
            <NavBar />
            <DashBoard />
            <Footer style={{ textAlign: 'center' }}>
                © 2025 Covid-19, Data source:
                <a
                    href="https://www.mohfw.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline ml-1"
                >
                    Ministry of Health and Family Welfare, India
                </a>.
            </Footer>
        </Layout>
    )
}

export default Home
