import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EscuelaList from './componentes/EscuelaList'
import EscuelaForm from './componentes/EscuelaForm';
import EmpresaList from './componentes/EmpresaList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EscuelaList />}></Route>
        <Route path='/escuelas/nueva' element={<EscuelaForm />}></Route>
        <Route path='/empresas' element={<EmpresaList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
