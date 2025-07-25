import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: [{ school: "", degree: "", start: "", end: "" }],
    skills: [""],
    experience: [{ company: "", position: "", start: "", end: "", description: "" }],
    certificates: [""],
    achievements: [""],
    languages: [""],
  });

  const [suggestions, setSuggestions] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    if (typeof updated[index] === "string") {
      updated[index] = value;
    } else {
      updated[index][field] = value;
    }
    setFormData({ ...formData, [section]: updated });
  };

  const addSectionItem = (section, emptyItem) => {
    setFormData({ ...formData, [section]: [...formData[section], emptyItem] });
  };

  const removeSectionItem = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const getSuggestions = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/suggestions", {
        formData,
      });
      setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error(err);
      setSuggestions("Error getting suggestions.");
    }
  };

  const downloadAsPDF = () => {
    window.print();
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "30px", padding: "20px" }}>
      <div className="container" style={{ flex: 1 }}>
        <h1>Smart Resume Builder</h1>

        <div className="row">
          <input name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} />
          <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          <input name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} />
          <textarea name="summary" placeholder="Professional Summary" onChange={handleChange} value={formData.summary} />
          
          <button onClick={getSuggestions}>
            suggest improvements 
          </button>

          {suggestions && (
            <p><strong>💡 GPT Suggestion:</strong> {suggestions}</p>
          )}
        </div>

        {/* Education */}
        <div className="section">
          <h2>Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="row">
              <input placeholder="School" value={edu.school} onChange={(e) => handleArrayChange("education", index, "school", e.target.value)} />
              <input placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)} />
              <input placeholder="Start" value={edu.start} onChange={(e) => handleArrayChange("education", index, "start", e.target.value)} />
              <input placeholder="End" value={edu.end} onChange={(e) => handleArrayChange("education", index, "end", e.target.value)} />
              <button onClick={() => removeSectionItem("education", index)}>❌</button>
            </div>
          ))}
          <button onClick={() => addSectionItem("education", { school: "", degree: "", start: "", end: "" })}>+ Add Education</button>
        </div>

        {/* Skills */}
        <div className="section">
          <h2>Skills</h2>
          {formData.skills.map((skill, index) => (
            <div key={index} className="row">
              <input placeholder="Skill" value={skill} onChange={(e) => handleArrayChange("skills", index, null, e.target.value)} />
              <button onClick={() => removeSectionItem("skills", index)}>❌</button>
            </div>
          ))}
          <button onClick={() => addSectionItem("skills", "")}>+ Add Skill</button>
        </div>

        {/* Experience */}
        <div className="section">
          <h2>Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="row">
              <input placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)} />
              <input placeholder="Position" value={exp.position} onChange={(e) => handleArrayChange("experience", index, "position", e.target.value)} />
              <input placeholder="Start" value={exp.start} onChange={(e) => handleArrayChange("experience", index, "start", e.target.value)} />
              <input placeholder="End" value={exp.end} onChange={(e) => handleArrayChange("experience", index, "end", e.target.value)} />
              <textarea placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange("experience", index, "description", e.target.value)} />
              <button onClick={() => removeSectionItem("experience", index)}>❌</button>
            </div>
          ))}
          <button onClick={() => addSectionItem("experience", { company: "", position: "", start: "", end: "", description: "" })}>+ Add Experience</button>
        </div>

        {/* Certificates */}
        <div className="section">
          <h2>Certificates</h2>
          {formData.certificates.map((cert, index) => (
            <div key={index} className="row">
              <input placeholder="Certificate" value={cert} onChange={(e) => handleArrayChange("certificates", index, null, e.target.value)} />
              <button onClick={() => removeSectionItem("certificates", index)}>❌</button>
            </div>
          ))}
          <button onClick={() => addSectionItem("certificates", "")}>+ Add Certificate</button>
        </div>

        {/* Achievements */}
        <div className="section">
          <h2>Achievements</h2>
          {formData.achievements.map((ach, index) => (
            <div key={index} className="row">
              <input placeholder="Achievement" value={ach} onChange={(e) => handleArrayChange("achievements", index, null, e.target.value)} />
              <button onClick={() => removeSectionItem("achievements", index)}>❌</button>
            </div>
          ))}
          <button onClick={() => addSectionItem("achievements", "")}>+ Add Achievement</button>
        </div>

        {/* Languages */}
        <div className="section">
          <h2>Languages</h2>
          {formData.languages.map((lang, index) => (
            <div key={index} className="row">
              <input placeholder="Language" value={lang} onChange={(e) => handleArrayChange("languages", index, null, e.target.value)} />
              <button onClick={() => removeSectionItem("languages", index)}>❌</button>
            </div>
          ))}
          <button onClick={() => addSectionItem("languages", "")}>+ Add Language</button>
        </div>

        {/* Buttons */}
        <div className="section" style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
          <button
            onClick={() => alert(JSON.stringify(formData, null, 2))}
            style={{
              padding: "10px 16px",
              background: "#4ade80",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            📄 Preview Resume (Raw JSON)
          </button>

          <button
            onClick={downloadAsPDF}
            style={{
              padding: "10px 16px",
              background: "#4ade80",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            📄 Download as PDF
          </button>
        </div>
      </div>

      {/* LIVE PREVIEW SIDE */}
      <div style={{ flex: 1 }}>
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>📄 Live Resume Preview</h1>
        <br />
        <div className="preview" style={{ background: "#f9f9f9", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2>{formData.name}</h2>
          <p>{formData.email} | {formData.phone}</p>

          <h3>Summary</h3>
          <p>{formData.summary}</p>

          <h3>Education</h3>
          {formData.education.map((edu, i) => (
            <p key={i}><strong>{edu.degree}</strong>, {edu.school} ({edu.start} - {edu.end})</p>
          ))}

          <h3>Experience</h3>
          {formData.experience.map((exp, i) => (
            <div key={i}>
              <strong>{exp.position}</strong> at {exp.company} ({exp.start} - {exp.end})
              <p>{exp.description}</p>
            </div>
          ))}

          <h3>Skills</h3>
          <ul>{formData.skills.map((s, i) => s && <li key={i}>{s}</li>)}</ul>

          <h3>Certificates</h3>
          <ul>{formData.certificates.map((c, i) => c && <li key={i}>{c}</li>)}</ul>

          <h3>Achievements</h3>
          <ul>{formData.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>

          <h3>Languages</h3>
          <ul>{formData.languages.map((l, i) => l && <li key={i}>{l}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
