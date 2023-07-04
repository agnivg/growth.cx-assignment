import React, { useState,useEffect } from "react";
import axios from "axios";

const Insight = ()=>{
    const [insights,setInsights]=useState(null)
    useEffect(()=>{
        axios({
            url:"https://growthcx-backend.onrender.com/getinsights",
            method:'GET'
        }).then(res=>{
            setInsights(res.data.data)
        })
        .catch((e) => {
            console.log("Internal Server error");
        });
    },[])

    const deleteInsight=(id)=>{
        axios({
            url:`https://growthcx-backend.onrender.com/deleteinsight/${id}`,
            method:'DELETE'
        }).then(res=>{
            const newInsights=insights.filter(data=>{
                if(id!=data._id)
                    return data
            })
            setInsights(newInsights)
        })
        .catch((e) => {
            console.log(e);
        });
    }

    const updateInsight=(id)=>{
        axios({
            url:`https://growthcx-backend.onrender.com/updateinsight/${id}`,
            method:'PUT'
        }).then(res=>{
            const newInsights=insights.map(data=>{
                if(id==data._id)
                    return res.data.data
                else
                    return data
            })
            setInsights(newInsights)
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return(
        <>
        <div className="container">
        {
            insights &&
            <table>
                <tr>
                    <th>Domain Name</th>
                    <th>WordCount</th>
                    <th>favourite</th>
                    <th>Web-Links</th>
                    <th>Media-Links</th>
                    <th>Actions</th>
                </tr>
                {
                    insights.map(data=>{
                        return(
                            <tr key={data._id}>
                                <td>{data.domainName}</td>
                                <td>{data.wordCount}</td>
                                <td>{data.favourite?<span>True</span>:<span>False</span>}</td>
                                <td>
                                    <ul>
                                    {
                                        data.webLinks.map(data=>{
                                            return <li>{data}</li>
                                        })
                                    }
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                    {
                                        data.mediaLinks.map(data=>{
                                            return <li>{data}</li>
                                        })
                                    }
                                    </ul>
                                </td>
                                <td>
                                <button onClick={()=>deleteInsight(data._id)}>Remove</button><br/>
                                <button onClick={()=>updateInsight(data._id)}>Add to Fav</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        }
        </div>
        </>
    )
}

export default Insight;