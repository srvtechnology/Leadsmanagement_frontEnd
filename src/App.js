import React, { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Header from './components/Header';
// import Footer from './components/Footer'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import EditProfile from './components/EditProfile';
import TeamLeader from './components/TeamLeader';
import TeleCaller from './components/TeleCaller';
import SbiEntry from './components/SbiEntry';
import ScbEntry from './components/ScbEntry';
import SummarySbi from './components/SummarySbi';
import SummaryScb from './components/SummaryScb';
import SbiEntryForm from './components/SbiEntryForm';
import ResetPass from './components/ResetPass';
import BankPerson from './components/BankPerson';
import CitiBankForm from './components/CitiBankForm';
import SummaryCitiBank from './components/SummaryCitiBank';
import HdfcBankForm from './components/HdfcBankForm';
import SummaryHdfc from './components/SummaryHdfc';


function App(props) {
  const history = useHistory()
  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      history.push("/login")
    }
  })
  var nowtime = new Date().getTime();
    let interval = JSON.parse(localStorage.getItem('interval'))
    console.log(interval,nowtime)
        if(nowtime > interval) {
            localStorage.clear()
            // localStorage.setItem('setupTime', now);
        }
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/reset-password" component={ResetPass} />
        <Route path="/edit-profile" component={EditProfile} />
        <Route path="/home" component={Home} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/team-leader" component={TeamLeader} />
        <Route path="/tele-caller" component={TeleCaller} />
        <Route path="/bank-person" component={BankPerson} />

        <Route path="/scb-entry" component={ScbEntry} />
        <Route path="/sbi-entry" component={SbiEntry} />
        <Route path="/Citi-bank-entry" component={CitiBankForm} />
        <Route path="/hdfc-bank-entry" component={HdfcBankForm} />

        <Route path="/scb-summary" component={SummaryScb} />
        <Route path="/sbi-summary" component={SummarySbi} />
        <Route path="/Citi-bank-summary" component={SummaryCitiBank} />
        <Route path="/hdfc-bank-summary" component={SummaryHdfc} />

        <Route path="/edit-sbi-entry/:id" component={SbiEntryForm} />
        <Route path="/edit-scb-entry/:id" component={ScbEntry} />
        <Route path="/edit-citi-bank-entry/:id" component={CitiBankForm} />
        <Route path="/edit-hdfc-bank-entry/:id" component={HdfcBankForm} />

        </Switch>
      
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;