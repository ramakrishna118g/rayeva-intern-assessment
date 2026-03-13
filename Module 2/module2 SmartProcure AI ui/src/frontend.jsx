import { useState } from "react";
import { Link } from "react-router-dom";
import './frontend.css'
function Userui() {

  const [businessType,setBusinessType] = useState("");
  const [purpose,setPurpose] = useState("");
  const [budget,setBudget] = useState("");
  const [response,setResponse] = useState(null);
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setLoading(true);
    setResponse(null);

    try{

      const res = await fetch("https://render.com/docs/node-version/generate-proposal",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          business_type:businessType,
          purpose:purpose,
          budget:budget
        })
      });

      const data = await res.json();

      if(data.success){
        setResponse(data.data);
      }

    }catch(err){
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="page">

      <Link to="/" className="home-link"></Link>

      <form className="eco-form" onSubmit={handleSubmit}>

        <h1>SmartProcure AI</h1>

        <div className="form-group">
          <label>Business Type</label>
          <input
            type="text"
            placeholder="Enter Business Type"
            value={businessType}
            onChange={(e)=>setBusinessType(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Purpose</label>
          <input
            placeholder="Enter Purpose"
            value={purpose}
            onChange={(e)=>setPurpose(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Budget</label>
          <input
            placeholder="Enter Budget"
            value={budget}
            onChange={(e)=>setBudget(e.target.value)}
          />
        </div>

        <button type="submit">
          {loading ? "Generating..." : "Generate Proposal"}
        </button>

      </form>

      <div className="response-section">

        {loading && (
          <div className="loader"></div>
        )}

        {response && (

          <div className="response-card">

            <h2>Sustainable Procurement Proposal</h2>

            <div className="tags-box">
              <h4>Recommended Product Mix</h4>
              {response.product_mix.map((item,i)=>(
                <div key={i} className="proposal-item">
                  <p><b>Product:</b> {item.product}</p>
                  <p><b>Quantity:</b> {item.quantity}</p>
                  <p><b>Estimated Cost:</b> ₹{item.estimated_cost}</p>
                </div>
              ))}
            </div>

            <p><b>Total Budget:</b> ₹{response.total_budget}</p>

            <div className="tags-box">
              <h4>Impact Summary</h4>
              <p>{response.impact_summary}</p>
            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Userui;
