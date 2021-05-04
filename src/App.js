import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import Admin from "./components/admin.component"
import ContactUs from "./components/contactUs.component"

function App() {
  return (
    <Router>
     <Navbar />
      <br/>
      <Route path="/" exact component={ContactUs} />
      <Route path="/admin" component={Admin} />
      
   </Router>
  );
}

export default App;
