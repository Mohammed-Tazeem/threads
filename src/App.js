import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Feed from './Pages/Feed';
import { AuthProvider } from './context/AuthContext'
import Login from './Pages/Login';
import Header from './Component/Header';
function App() {
  return (

    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
