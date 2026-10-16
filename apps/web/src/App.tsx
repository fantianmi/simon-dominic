import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import RatioQuery from './pages/RatioQuery';
import SpecialForces from './pages/SpecialForces';
import Paodao from './pages/Paodao';
import RentalForm from './pages/RentalForm';
import Platforms from './pages/Platforms';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* 模块一 */}
        <Route path="/ratio" element={<RatioQuery />} />
        {/* 模块二 */}
        <Route path="/special-forces" element={<SpecialForces />} />
        {/* 模块三 */}
        <Route path="/paodao" element={<Paodao />} />
        {/* 模块四 */}
        <Route path="/rent-out" element={<RentalForm />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
