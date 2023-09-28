import { useState } from "react";

const CompanyProfile = () => {
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [companyRegistration, setCompanyRegistration] = useState("");
  const [licenseExp, setLicenseExp] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bankName, setBankName] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [account, setAccount] = useState('');
  const [corporate, setCorporate] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    console.log(business, email, number, address, city, country, companyRegistration, licenseExp, firstName, lastName, bankName, beneficiary, account, corporate, comments);
  }

  return (
    <div className="companyProfile">
      <h3 style={{margin: 0}}>Company Contact Information</h3>
      <div className="formContainer">
        <section>
          <div className="wrapper">
            <div
              className="container"
              style={{ width: "100%", boxSizing: "border-box" }}
            >
              <label>Business Name</label>
              <input
                type="text"
                onChange={(e) => setBusiness(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div className="container">
              <label>Email</label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="container">
              <label>Phone Number</label>
              <input
                type="tel"
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div
              className="container"
              style={{ width: "100%", boxSizing: "border-box" }}
            >
              <label>Company Address</label>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div className="container">
              <label>City</label>
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="container">
              <label>Country</label>
              <input
                type="tel"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div className="container">
              <label>Company Registration #</label>
              <input
                type="text"
                onChange={(e) => setCompanyRegistration(e.target.value)}
                required
              />
            </div>
            <div className="container">
              <label>License Expiry Date</label>
              <input
                type="date"
                onChange={(e) => setLicenseExp(e.target.value)}
                required
              />
            </div>
          </div>
        </section>
        <section>
          <p style={{margin: 0}}>Contact Point</p>
          <div className="wrapper">
            <div className="container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="container">
              <label>Last Name</label>
              <input
                type="tel"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div
              className="container"
              style={{ width: "100%", boxSizing: "border-box" }}
            >
              <label>Bank Name</label>
              <input
                type="text"
                onChange={(e) => setBankName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div className="container">
              <label>Beneficiary Name</label>
              <input
                type="text"
                onChange={(e) => setBeneficiary(e.target.value)}
                required
              />
            </div>
            <div className="container">
              <label>Account Number</label>
              <input
                type="tel"
                onChange={(e) => setAccount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div
              className="container"
              style={{ boxSizing: "border-box" }}
            >
              <label>Corporate License #</label>
              <input
                type="text"
                onChange={(e) => setCorporate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapper">
            <div className="container">
            <textarea
              placeholder="Comments"
              onChange={e => setComments(e.target.value)}
            ></textarea>
            </div>
          </div>
          <button onClick={handleSubmit}>Create</button>
        </section>
      </div>
    </div>
  );
};

export default CompanyProfile;
