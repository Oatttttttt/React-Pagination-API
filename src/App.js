import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Nasa-jpl-url",
    selector: (row) => row.nasa_jpl_url,
  },
  {
    name: "Absolute magnitude h",
    selector: (row) => row.absolute_magnitude_h,
  },
];

function App() {
  const [NeoWs, setNeoWs] = useState([]);

  const url_api = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url_api);
        if (response.status === 200) {
          const data = response.data;
          const neoData = Object.values(data.near_earth_objects).flat();
          setNeoWs(neoData);
        } else {
          console.error("Error fetching NEO data");
        }
      } catch (error) {
        console.error("Error fetching NEO data:", error);
      }
    };

    fetchData();
  }, [url_api]);

  return (
    <div className="App">
      <h3 style={{ textAlign: "center" }}>
        APIs from :{" "}
        <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer">
          https://api.nasa.gov/
        </a>
      </h3>
      <DataTable columns={columns} data={NeoWs} pagination />
    </div>
  );
}

export default App;
