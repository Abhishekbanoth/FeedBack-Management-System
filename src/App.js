// App.js
import React from 'react';
import './App.css';
import FeedbackForm from './Components/FeedbackForm';
import FeedbackReports from './Components/FeedbackReports';
import FeedbackCharts from './Components/FeedbackCharts';

const App = () => {
  // const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  return (
    <div>

      {/* Feedback Submission Form */}
      <FeedbackForm />

      {/* Display Feedback Reports */}
      <FeedbackReports />

      {/* Display Feedback Graphs */}
      <FeedbackCharts />
    </div>
  );
};

export default App;
