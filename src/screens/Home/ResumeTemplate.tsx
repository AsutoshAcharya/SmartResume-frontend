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
        fontFamily: "Times New Roman",
        color: "#111",
        lineHeight: 1.5,
        padding: "40px",
        maxWidth: 900,
        margin: "auto",
        backgroundColor: "#FFF",
      }}
    >
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

      {/* <hr style={{ margin: "20px 0" }} /> */}

      <h6 style={{ fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
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
          <ul style={{ marginTop: 5 }}>
            {exp.descriptions.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}

      <h6 style={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>
        Projects
      </h6>
      {projects.map((proj, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <h4 style={{ fontWeight: "bold" }}>{proj.title}</h4>
          <span style={{ float: "right" }}>
            <a href={proj.repoLink} target="_blank" rel="noopener noreferrer">
              GitHub Repo
            </a>
          </span>
          <ul>
            {proj.descriptions.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
          <em>Technologies:</em> {proj.techStack.join(", ")}
        </div>
      ))}

      {others.map((section, idx) => (
        <>
          <h6 key={idx} style={{ borderBottom: "1px solid #ccc" }}>
            {section.title}
          </h6>
          <ul>
            {section.info.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      ))}

      <h6 style={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>
        Education
      </h6>
      {education.map((edu, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ fontWeight: "bold" }}>{edu.course}</h4>
            <span>{formatDate(edu.endDate)}</span>
          </div>
          <em>{edu.college}</em>
        </div>
      ))}
    </div>
  );
};

export default ResumeTemplate;
