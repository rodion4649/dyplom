import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import QuestionsPage from './pages/QuestionsPage';
import SettingsPage from './pages/SettingsPage';
import TestStartPage from './pages/TestStartPage';
import TestQuestionPage from './pages/TestQuestionPage';
import TestResultPage from './pages/TestResultPage';
import ResultsPage from './pages/ResultsPage';
import ExamsPage from './pages/ExamsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/test/start" element={<TestStartPage />} />
        <Route path="/test/question" element={<TestQuestionPage />} />
        <Route path="/test/result" element={<TestResultPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
