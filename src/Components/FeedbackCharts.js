import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const FeedbackCharts = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/get-reports')
            .then((response) => {
                setReports(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reports:', error);
            });
    }, []);

    // Separate the reports based on sentiment
    const positiveReports = reports.filter((report) => report.sentiment === 'positive');
    const neutralReports = reports.filter((report) => report.sentiment === 'neutral');
    const negativeReports = reports.filter((report) => report.sentiment === 'negative');

    // Data for Pie chart (Sentiment Distribution)
    const sentimentData = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
            {
                data: [
                    positiveReports.length,
                    neutralReports.length,
                    negativeReports.length,
                ],
                backgroundColor: ['#4caf50', '#ffa500', '#f44336'],
                hoverOffset: 4,
            },
        ],
    };

    // Data for Bar chart (Feedback Counts per Sentiment)
    const sentimentBarData = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
            {
                label: 'Feedback Count',
                data: [
                    positiveReports.length,
                    neutralReports.length,
                    negativeReports.length,
                ],
                backgroundColor: ['#4caf50', '#ffa500', '#f44336'],
            },
        ],
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Feedback Reports Visualized</h2>

            <div style={styles.chartWrapper}>
                <div style={styles.chartContainer}>
                    <h3 style={styles.chartTitle}>Sentiment Distribution (Pie Chart)</h3>
                    <Pie data={sentimentData} />
                </div>

                <div style={styles.chartContainer}>
                    <h3 style={styles.chartTitle}>Feedback Count per Sentiment (Bar Chart)</h3>
                    <Bar data={sentimentBarData} options={options} />
                </div>
            </div>
        </div>
    );
};

// Chart.js options for customization
const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Feedback Distribution',
        },
        tooltip: {
            callbacks: {
                label: (context) => `${context.raw} Feedbacks`,
            },
        },
    },
};

// Styles for the page
const styles = {
    container: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    title: {
        fontSize: '28px',
        color: '#333',
        textAlign: 'center',
    },
    chartWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        width: '100%',
        flexWrap: 'wrap',
    },
    chartContainer: {
        flex: '1 1 calc(50% - 20px)', // Take 50% width with a small gap
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%', // Ensure charts don’t exceed their container
    },
    chartTitle: {
        fontSize: '20px',
        color: '#333',
        marginBottom: '15px',
        textAlign: 'center',
    },
};

export default FeedbackCharts;
