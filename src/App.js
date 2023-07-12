import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Feed from './Pages/Feed';
import { AuthProvider } from './context/AuthContext'
function App() {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Feed />} />
        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
