import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackReports = () => {
    const [reports, setReports] = useState([]);
    const [activeSection, setActiveSection] = useState(null);

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

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Feedback Reports</h2>

            <div style={styles.row}>
                {/* Positive Feedback Section */}
                <div style={styles.column}>
                    <div style={styles.section}>
                        <h3
                            style={{ ...styles.sectionTitle, color: '#4caf50' }}
                            onClick={() => toggleSection('positive')}
                        >
                            Positive Feedback
                        </h3>
                        {activeSection === 'positive' && (
                            <ul style={styles.list}>
                                {positiveReports.map((report) => (
                                    <li key={report.id} style={styles.reportItem}>
                                        <strong>{report.feedback}</strong> ({report.sentiment})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Neutral Feedback Section */}
                <div style={styles.column}>
                    <div style={styles.section}>
                        <h3
                            style={{ ...styles.sectionTitle, color: '#ffa500' }}
                            onClick={() => toggleSection('neutral')}
                        >
                            Neutral Feedback
                        </h3>
                        {activeSection === 'neutral' && (
                            <ul style={styles.list}>
                                {neutralReports.map((report) => (
                                    <li key={report.id} style={styles.reportItem}>
                                        <strong>{report.feedback}</strong> ({report.sentiment})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Negative Feedback Section */}
                <div style={styles.column}>
                    <div style={styles.section}>
                        <h3
                            style={{ ...styles.sectionTitle, color: '#f44336' }}
                            onClick={() => toggleSection('negative')}
                        >
                            Negative Feedback
                        </h3>
                        {activeSection === 'negative' && (
                            <ul style={styles.list}>
                                {negativeReports.map((report) => (
                                    <li key={report.id} style={styles.reportItem}>
                                        <strong>{report.feedback}</strong> ({report.sentiment})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles object
const styles = {
    container: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    title: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '15px',
        textAlign: 'center'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap', // To ensure responsiveness
    },
    column: {
        width: '30%', // Each column takes 30% of the width, leaving space for gaps
        minWidth: '280px', // Minimum width to ensure readability on smaller screens
        marginBottom: '20px',
    },
    section: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        cursor: 'pointer',
    },
    sectionTitle: {
        fontSize: '1.5em',
        marginBottom: '10px',
    },
    list: {
        listStyle: 'none',
        padding: '0',
        margin: '10px 0 0 0',
    },
    reportItem: {
        backgroundColor: '#e9f3ff',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        fontSize: '18px',
        color: '#555'
    },
};

export default FeedbackReports;
