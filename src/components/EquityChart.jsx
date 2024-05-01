import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    PointElement,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Filler
);

export default function EquityChart() {
    const createGradient = (color1, color2) => {
        const ctx = document.createElement("canvas").getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Adjust the coordinates as needed
        gradient.addColorStop(0.3, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    };

    const equityOptions = {
        scales: {
            x: {
                display: false, // Set to false to hide x-axis
            },
            y: {
                display: false, // Set to false to hide y-axis
            },
        },
        plugins: {
            legend: {
                display: false, // Set to true to hide legend
            },
            filler: {
                propagate: true,
            },
        },
        maintainAspectRatio: false, // Disable aspect ratio to allow chart to resize freely
        responsive: true, // Enable responsiveness
    };

    const equityData = {
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        datasets: [
            {
                label: "",
                data: [3000, 5000, 4000, 6000, 8000, 5000, 8000],
                borderColor: "transparent",
                color: "#8339e8",
                lineTension: 0.5,
                fill: true,
                pointRadius: 0,
                backgroundColor: createGradient("#E8B923", "#E8B92300"),
                borderCapStyle: "round",
            },
        ],
    };

    return (
        <>
            <Line data={equityData} options={equityOptions} />
        </>
    );
}
