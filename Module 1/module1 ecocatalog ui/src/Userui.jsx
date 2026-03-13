import { useState } from "react";
import "./Userui.css";
import { Link } from "react-router-dom";

function Userui() {

  const [name,setname] = useState("");
  const [description,setdescription] = useState("");
  const [response,setresponse] = useState(null);
  const [loading,setloading] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setloading(true);
    setresponse(null);

    try{

      const res = await fetch("https://rayeva-intern-assessment.onrender.com/generate-metadata",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          product_name:name,
          product_description:description
        })
      });

      const data = await res.json();

      if(data.success){
        setresponse(data.data);
      }

    }catch(err){
      console.log(err);
    }

    setloading(false);
  };

  return (
    <div className="page">

      <Link to="/" className="home-link"></Link>

      {/* YOUR EXISTING FORM */}
      <form className="eco-form" onSubmit={handleSubmit}>

        <h1>🌿 EcoCatalog AI</h1>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product Description</label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e)=>setdescription(e.target.value)}
          />
        </div>

        <button type="submit">
          {loading ? "Generating..." : "Add Product"}
        </button>

      </form>


      {/* RESPONSE SECTION BELOW FORM */}
      <div className="response-section">

        {loading && (
          <div className="loader"></div>
        )}

        {response && (

          <div className="response-card">

            <h2>AI Metadata</h2>

            <p><b>Primary Category:</b> {response.primary_category}</p>

            <p><b>Subcategory:</b> {response.subcategory}</p>

            <div className="tags-box">
              <h4>SEO Tags</h4>
              {response.seo_tags.map((tag,i)=>(
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>

            <div className="tags-box">
              <h4>Sustainability Filters</h4>
              {response.sustainability_filters.map((tag,i)=>(
                <span key={i} className="tag green">{tag}</span>
              ))}
            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Userui;
