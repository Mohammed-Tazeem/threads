import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Feed from './Pages/Feed';
import { AuthProvider } from './context/AuthContext'
import Login from './Pages/Login';
import Header from './Component/Header';
import Profile from './Pages/Profile';
import ThreadPage from './Pages/ThreadPage';
import MainLayout from './Component/MainLayout';
function App() {
  return (

    <Router>
      <AuthProvider>

        <MainLayout>
          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:username' element={<Profile />} />
            <Route path='/thread/:id' element={<ThreadPage />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>

  );
}

export default App;
