import { Routes, Route, Link } from 'react-router-dom';
import Start from './pages/Start.jsx';
import Quiz from './pages/Quiz.jsx';
import Result from './pages/Result.jsx';

export default function App() {
  return (
    <div className="container py-4">
      <nav className="mb-4">
        <Link to="/" className="navbar-brand">Questionário Online</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resultado" element={<Result />} />
      </Routes>
    </div>
  );
}