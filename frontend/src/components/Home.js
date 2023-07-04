import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [url, setUrl] = useState("");
  const [wordCount, setWordCount] = useState(null)
  const [hyperLinks, setHyperLinks] = useState([])
  const [mediaLinks, setMediaLinks] = useState([])
  const submit = () => {
    axios({
      url: "https://growthcx-backend.onrender.com/postinsight",
      method: "POST",
      data: { url: url },
    })
    .then((res) => {
        setHyperLinks(res.data.webLinks)
        setMediaLinks(res.data.mediaLinks)
        setWordCount(res.data.wordCount)
    })
    .catch((e) => {
        console.log("Internal Server error");
    });
  };
  return (
    <>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10%'}}>
            <div style={{textAlign: 'center', width: '50%', backgroundColor: '#99ccff', padding: '2%'}}>
                <input
                    style={{width:'80%', height: '20px'}}
                    type="text"
                    placeholder="Enter Website Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                /><br />
                <button onClick={()=>submit()} style={{marginTop:'5px', height: '25px'}}>
                    Get Insights
                </button><br/>
                {
                    wordCount &&
                    <h3>WordCount: {wordCount}</h3>
                }
                {
                    hyperLinks && hyperLinks.length>0 &&
                    <div>
                        <h4>WebLinks:</h4>
                        <ul>
                            {
                                hyperLinks.map((data)=>{
                                    return <li>{data}</li>
                                })
                            }
                        </ul>
                    </div>
                }
                {
                    mediaLinks && mediaLinks.length>0 &&
                    <div>
                        <h4>MediaLinks:</h4>
                        <ul>
                            {
                                mediaLinks.map((data)=>{
                                    return <li>{data}</li>
                                })
                            }
                        </ul>
                    </div>
                }
                <button style={{height: '25px',marginTop:'5px'}}><Link to='/insights' style={{textDecoration:'none',color:'black'}}>View All Insights</Link></button>
            </div>
        </div>
    </>
  );
};

export default Home;