import React from "react";
import { ResumeForm } from "./type";

interface ResumeTemplateProps {
  data: ResumeForm;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  const { personalInfo, experience, projects, education, others } = data.resume;

  const formatDate = (dateStr: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "";

  return (
    <div
      style={{
        fontFamily: "Arial",
        color: "#111",
        lineHeight: 1.5,
        padding: "40px",
        height: "1123px",
        width: "794px",
        margin: "auto",
        backgroundColor: "#FFF",
      }}
    >
      {/* Header */}
      <h1 style={{ fontSize: "2rem", textAlign: "center", marginBottom: 5 }}>
        {personalInfo.name}
      </h1>
      <div style={{ textAlign: "center", fontSize: "0.95rem", color: "#333" }}>
        {personalInfo.address}, {personalInfo.phone},{" "}
        <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        {personalInfo.links.length > 0 && (
          <>
            {" | "}
            {personalInfo.links.map((link, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: 5, marginRight: 5 }}
              >
                {link}
              </a>
            ))}
          </>
        )}
      </div>

      {/* Experience */}
      <h6
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #ccc",
          marginTop: 20,
        }}
      >
        Experience
      </h6>
      {experience.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ fontWeight: "bold" }}>
              {exp.companyName}, {exp.companyLocation}
            </h4>
            <span>
              {formatDate(exp.dateOfJoining)} –{" "}
              {exp.isCurrentlyEmployed
                ? "Present"
                : formatDate(exp.dateOfLeaving)}
            </span>
          </div>
          <em>{exp.role}</em>
          <ul
            style={{ marginTop: 5, paddingLeft: "20px", listStyleType: "disc" }}
          >
            {exp.descriptions.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Projects */}
      <h6
        style={{
          borderBottom: "1px solid #ccc",
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Projects
      </h6>
      {projects.map((proj, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ fontWeight: "bold" }}>{proj.title}</h4>
            <a href={proj.repoLink} target="_blank" rel="noopener noreferrer">
              GitHub Repo
            </a>
          </div>
          <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
            {proj.descriptions.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
          <em>Technologies:</em> {<em>{proj.techStack.join(", ")}</em>}
        </div>
      ))}

      {/* Skills */}
      <h6
        style={{
          borderBottom: "1px solid #ccc",
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Skills
      </h6>
      <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
        {others.map((section, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: "5px",
              listStyleType: "disc",
              display: "list-item",
            }}
          >
            <strong>{section.title}:</strong> {section.info.join(", ")}
          </li>
        ))}
      </ul>

      {/* Education */}
      <h6
        style={{
          borderBottom: "1px solid #ccc",
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Education
      </h6>
      <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
        {education.map((edu, idx) => (
          <li key={idx} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ fontWeight: "bold", margin: 0 }}>{edu.course}</h4>
              <span>{formatDate(edu.endDate)}</span>
            </div>
            <em>{edu.college}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeTemplate;
