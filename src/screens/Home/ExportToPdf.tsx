import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import { ResumeForm } from "./type";
import { Fragment } from "react/jsx-runtime";

Font.register({
  family: "Arial",
  src: "https://fonts.gstatic.com/s/arial/v11/u9wVEBjA0aFGztUMU7J9kA.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111",
    lineHeight: 1.3,
  },
  header: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "bold",
  },
  subHeader: {
    textAlign: "center",
    fontSize: 9,
    color: "#333",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    marginTop: 15,
    marginBottom: 4,
    fontWeight: "bold",
    borderBottom: "1pt solid #ccc",
    paddingBottom: 2,
  },
  section: {
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletItem: {
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
});

const formatDate = (dateStr: string) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

const ExportToPdf = ({ data }: { data: ResumeForm }) => {
  const { personalInfo, experience, projects, education, others, skills } =
    data.resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{personalInfo.name}</Text>
        <View style={styles.subHeader}>
          <Text>
            {personalInfo.address} | {personalInfo.phone} | {personalInfo.email}
            {personalInfo.links.map((link, idx) => {
              let label = "";
              if (link.includes("linkedin.com")) label = "LinkedIn";
              else if (link.includes("github.com")) label = "GitHub";
              else label = link;
              return (
                <Fragment key={idx}>
                  <Text style={{ marginHorizontal: 2 }}>&nbsp;|&nbsp;</Text>
                  <Link
                    src={link}
                    style={{
                      color: "black",
                      textDecorationColor: "black",
                      fontSize: 9,
                      marginRight: 4,
                    }}
                  >
                    {label}
                  </Link>
                </Fragment>
              );
            })}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Experience</Text>
        {experience.map((exp, idx) => (
          <View key={idx} style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.bold}>
                {exp.companyName}, {exp.companyLocation}
              </Text>
              <Text>
                {formatDate(exp.dateOfJoining)} –{" "}
                {exp.isCurrentlyEmployed
                  ? "Present"
                  : formatDate(exp.dateOfLeaving)}
              </Text>
            </View>
            <Text style={styles.italic}>{exp.role}</Text>
            <View style={styles.bulletList}>
              {exp.descriptions.map((desc, i) => (
                <Text key={i} style={styles.bulletItem}>
                  • {desc}
                </Text>
              ))}
            </View>
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionTitle}>Projects</Text>
        {projects.map((proj, idx) => (
          <View key={idx} style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.bold}>{proj.title}</Text>
              {(proj.projectLink || proj.repoLink) && (
                <View style={{ flexDirection: "row", gap: 4 }}>
                  {proj.projectLink && (
                    <Link
                      src={proj.projectLink}
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        fontSize: 9,
                        marginRight: 4,
                      }}
                    >
                      Live
                    </Link>
                  )}
                  {proj.projectLink && proj.repoLink && (
                    <Text style={{ fontSize: 9, marginRight: 4 }}>|</Text>
                  )}
                  {proj.repoLink && (
                    <Link
                      src={proj.repoLink}
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        fontSize: 9,
                      }}
                    >
                      GitHub
                    </Link>
                  )}
                </View>
              )}
            </View>
            <View style={styles.bulletList}>
              {proj.descriptions.map((desc, i) => (
                <Text key={i} style={styles.bulletItem}>
                  • {desc}
                </Text>
              ))}
            </View>
            <Text style={styles.italic}>
              Technologies: {proj.techStack.join(", ")}
            </Text>
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.bulletList}>
          {skills.map((section, idx) => (
            <Text key={idx} style={styles.bulletItem}>
              • <Text style={styles.bold}>{section.title}:</Text>{" "}
              {section.info.join(", ")}
            </Text>
          ))}
        </View>

        {/* Education */}
        <Text style={styles.sectionTitle}>Education</Text>
        {education.map((edu, idx) => (
          <View key={idx} style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.bold}>{edu.course}</Text>
              <Text>{formatDate(edu.endDate)}</Text>
            </View>
            <Text style={styles.italic}>{edu.college}</Text>
          </View>
        ))}
        {/* Others */}
        <Text style={styles.sectionTitle}>Others</Text>
        <View style={styles.bulletList}>
          {others.map((section, idx) => (
            <Text key={idx} style={styles.bulletItem}>
              • <Text style={styles.bold}>{section.title}:</Text>{" "}
              {section.info.join(", ")}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ExportToPdf;
