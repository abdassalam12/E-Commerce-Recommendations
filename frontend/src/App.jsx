import { Route } from 'react-router-dom';
import { BrowserRouter as Router,Routes } from 'react-router-dom';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx'; // Assuming Login.js is in the same directory
import TestToken from './TestToken';
import ProductDetail from './Product_detail.jsx';
import Each from './Each.jsx';
import Clustered from './Clustered.jsx'
import Cluster_detail from './Cluster_detail.jsx';
import Addproduct from './Addproduct.jsx';
import User from './User.jsx';
import Appa from './Appa.jsx';
import Menu from './Menu.jsx';
import Move from './move/Move.jsx'
import Panier from './Panier.jsx';
import Constent_detail from './Constent_detail.jsx';
import Manage from './mange/Manage.jsx';
import Prouser from './Prouser.jsx';
function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/Clustered" element={<Clustered />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/testToken" element={<TestToken />} />
        <Route path="/product" element={<Each />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cluster/:id" element={<Cluster_detail />} />
        <Route path="/add" element={<Addproduct />} />
        <Route path="/user" element={<User />} />
        <Route path='/appa' element={<Appa />} ></Route>
      <Route path='/menu' element={<Menu />}> </Route>
      <Route path='/move' element={<Move />}></Route>
      <Route path='/Panier' element={<Panier />}></Route>
      <Route path='/Constent_detail/:id' element={<Constent_detail />}></Route>
      <Route path='/Manage' element={<Manage />}></Route>
      <Route path='/prouser' element={<Prouser />}></Route>
      
      </Routes>
    </Router>
  );
}

export default App;
