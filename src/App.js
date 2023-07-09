import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Feed from './Pages/Feed';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Feed />} />
      </Routes>


    </Router>

  );
}

export default App;
