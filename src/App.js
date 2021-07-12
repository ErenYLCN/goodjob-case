import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Datatable from "./datatable";
import Charts from "./charts";
import './components/main.css'

function App() {
  
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    axios.get("https://recruitment-mock-data.gjg-ads.io/data")
         .then(res=> {
           setData(res.data.data)
         })
         .catch(err => {
           console.log(err)
         });
  }, []);

  return (
    <div>
        {/* Header */}
        <header className="pt-6 pl-0 xl:pl-48 pr-0 xl:pr-48 flex items-center justify-center xl:justify-between border-b-2 border-blue-200">
          <div className="hidden xl:block ml-48">
            <img src="https://goodjobgames.com/images/gjg-header-logo.svg" ></img>
          </div>
          <div className="flex justify-between mr-0 xl:mr-48 md:ml-0">
            <button className={activeTab == 0 ? 'tab-btn active-tab uppercase' : 'tab-btn inactive uppercase'} 
                    onClick={() => setActiveTab(0)}>Table View</button>
            <button className={activeTab == 1  ? 'tab-btn active-tab uppercase' : 'tab-btn inactive uppercase'} 
                    onClick={() => setActiveTab(1)} > Graph View </button>
          </div>
        </header> 

        {/* Tabs that include table and graph view */}
        <div className="content-tabs">
          <div className={activeTab === 0 ? "content active-content" : "content"}>
            <Datatable data={data} /> 
          </div>
          <div className={activeTab === 1 ? "content active-content" : "content"}>
            <Charts data={data} />
          </div>
        </div>
    </div>
  );
}

export default App;
