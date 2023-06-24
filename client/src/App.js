import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EscuelaList from './componentes/EscuelaList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EscuelaList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
