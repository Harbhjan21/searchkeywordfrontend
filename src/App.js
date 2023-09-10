import React, { useState } from "react";
import axios from "axios"; // For making API requests to the Node.js backend

function App() {
  const [keywords, setKeywords] = useState("");
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleFilesChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (keywords.trim() === "") {
      alert("Please enter keywords.");
      return;
    }

    const formData = new FormData();
    formData.append("keywords", keywords);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/uploads",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("done");
      setResults(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          height: 100,
          backgroundColor: "blueviolet",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>Keyword Search Application</h1>
      </div>
      <div
        style={{
          border: "2px solid black",
          display: "flex",
          justifyContent: "center",
          width: 300,
          marginTop: 50,
          marginLeft: 10,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: 10 }}>
            <input
              type="text"
              placeholder="Enter keywords"
              value={keywords}
              onChange={handleKeywordsChange}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <input
              type="file"
              name="files"
              multiple
              onChange={handleFilesChange}
              accept=".pdf,.xlsx,.docx"
            />
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
      <div
        style={{
          marginTop: 30,
        }}
      >
        <h2>Search Results:</h2>
        <table
          style={{ border: "2px solid black", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ border: "2px solid black" }}>Document Name</th>
              <th style={{ border: "2px solid black" }}>Sentence</th>
            </tr>
          </thead>
          {results?.length > 0 ? (
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td style={{ border: "2px solid black" }}>
                    {result.filename}
                  </td>
                  {result.sentence.map((item) => {
                    return (
                      <td style={{ border: "2px solid black" }}>{item}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ) : (
            <b>(not found)</b>
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
