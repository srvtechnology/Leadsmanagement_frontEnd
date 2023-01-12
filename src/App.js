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
import FosList from './components/FosList';
import CitiBankForm from './components/CitiBankForm';
import SummaryCitiBank from './components/SummaryCitiBank';
import HdfcBankForm from './components/HdfcBankForm';
import SummaryHdfc from './components/SummaryHdfc';
import ViewSbiLead from './components/ViewSbiLead';
import IIBEntry from './components/IIBEntry';
import HsbcEntry from './components/HsbcEntry';
import IdfcEntry from './components/IdfcEntry';
import SummaryIIB from './components/SummaryIIB';
import SummaryHsbc from './components/SummaryHsbc';
import SummaryIdfc from './components/SummaryIdfc';
import SummaryLeave from './components/SummaryLeave';
import LeaveForm from './components/LeaveForm';
import LeaveApplication from './components/LeaveApplication';
import ViewScbLead from './components/ViewScbLead';
import ViewHsbcLead from './components/ViewHsbcLead';
import ViewIdfcLead from './components/ViewIdfcLead';
import ViewIIBLead from './components/ViewIIBLead';
import ViewCitiLead from './components/ViewCitiLead';
import ViewHdfcLead from './components/ViewHdfcLead';
import LoanForm from './components/LoanForm';
import SummaryLoan from './components/SummaryLoan';
import ViewLoanLead from './components/ViewLoanLead';
import BankPersonLoan from './components/BankPersonLoan';


function App(props) {
  var nowtime = new Date().getTime();
    let interval = JSON.parse(localStorage.getItem('interval'))
  const history = useHistory()
  if (!localStorage.getItem('user-info')) {
    history.push("/login")
}
  useEffect(() => {
    if (interval === null) {
      history.push("/login")
    }
  })
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
        <Route path="/bank-person-loan" component={BankPersonLoan} />
        <Route path="/fos-list" component={FosList} />


        <Route path="/scb-entry" component={ScbEntry} />
        <Route path="/sbi-entry" component={SbiEntry} />
        <Route path="/Citi-bank-entry" component={CitiBankForm} />
        <Route path="/hdfc-bank-entry" component={HdfcBankForm} />
        <Route path="/iib-entry" component={IIBEntry} />
        <Route path="/hsbc-entry" component={HsbcEntry} />
        <Route path="/idfc-entry" component={IdfcEntry} />

        <Route path="/scb-summary" component={SummaryScb} />
        <Route path="/sbi-summary" component={SummarySbi} />
        <Route path="/Citi-bank-summary" component={SummaryCitiBank} />
        <Route path="/hdfc-bank-summary" component={SummaryHdfc} />
        <Route path="/iib-summary" component={SummaryIIB} />
        <Route path="/hsbc-summary" component={SummaryHsbc} />
        <Route path="/idfc-summary" component={SummaryIdfc} />

        <Route path="/edit-sbi-entry/:id" component={SbiEntryForm} />
        <Route path="/edit-scb-entry/:id" component={ScbEntry} />
        <Route path="/edit-citi-bank-entry/:id" component={CitiBankForm} />
        <Route path="/edit-hdfc-bank-entry/:id" component={HdfcBankForm} />
        <Route path="/edit-iib-entry/:id" component={IIBEntry} />
        <Route path="/edit-hsbc-entry/:id" component={HsbcEntry} />
        <Route path="/edit-idfc-entry/:id" component={IdfcEntry} />

        <Route path="/view-sbi-entry/:id" component={ViewSbiLead} />
        <Route path="/view-scb-entry/:id" component={ViewScbLead} />
        <Route path="/view-citi-bank-entry/:id" component={ViewCitiLead} />
        <Route path="/view-hdfc-bank-entry/:id" component={ViewHdfcLead} />
        <Route path="/view-iib-entry/:id" component={ViewIIBLead} />
        <Route path="/view-hsbc-entry/:id" component={ViewHsbcLead} />
        <Route path="/view-idfc-entry/:id" component={ViewIdfcLead} />
        
        <Route path="/manage-leave" component={SummaryLeave} />
        <Route path="/leave-application" component={LeaveForm} />
        <Route path="/view-leave-application/:id" component={LeaveApplication} />

        <Route path="/loan-form/:bank" component={LoanForm} />
        <Route path="/loan-summary/:bank" component={SummaryLoan} />
        <Route path="/edit-loan-bank-entry/:loan_id/:bank" component={LoanForm} />
        <Route path="/view-loan-bank-entry/:loan_id/:bank" component={ViewLoanLead} />

        <Route path="/loan-form" component={LoanForm} />
        <Route path="/loan-summary" component={SummaryLoan} />
        <Route path="/edit-loan-bank-entry/:loan_id" component={LoanForm} />
        <Route path="/view-loan-bank-entry/:loan_id" component={ViewLoanLead} />

        </Switch>
      
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;