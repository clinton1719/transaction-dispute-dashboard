import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="p-4 text-xl font-bold">🏦 Dispute Dashboard</header>
        <main className="p-4">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
