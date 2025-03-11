import React, { useState } from "react";
import Header from "./Header";
import Card from "./Card";

const Course = () => {
  const [activeData, setActiveData] = useState("");
  return (
    <div style={{ padding: "10px", height: "87vh", overflowY: "scroll" }}>
      <div>
        <Header setActiveData={setActiveData} />
      </div>
      <div>
        <Card activeData={activeData} />
      </div>
    </div>
  );
};

export default Course;
