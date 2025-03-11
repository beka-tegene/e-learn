import React from "react";

const Information = () => {
  return (
    <div style={styles.container}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <h2 style={styles.title}>
              Transform Your Workforce Through Partnership with Fancy Catering Academy
            </h2>
            <p style={styles.subtitle}>
              Unlock Exclusive Benefits for Your Employees with Our Online Courses
            </p>
            <ul style={styles.list}>
              <li>
                <strong>Tailored Learning Paths:</strong> Customized course recommendations based on individual employee needs and skill gaps.
              </li>
              <li>
                <strong>Access to Premium Content:</strong> Offer your employees exclusive access to high-quality courses from leading experts and institutions.
              </li>
              <li>
                <strong>Flexible Learning:</strong> Enable your workforce to learn at their own pace, anytime and anywhere, with our online platform.
              </li>
              <li>
                <strong>Certifications and Credentials:</strong> Empower your employees to earn recognized certifications and credentials to enhance their professional profiles.
              </li>
              <li>
                <strong>Engagement and Support:</strong> Foster a culture of continuous learning with our interactive and engaging course materials, supported by our dedicated customer success team.
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-12" style={styles.description}>
            By partnering with Fancy Catering Academy, your company gains a competitive advantage by investing in the growth and development of your most valuable asset – your employees. Our online courses provide a flexible and accessible way for your workforce to acquire new skills, stay updated with industry trends, and advance their careers. With tailored learning paths, access to premium content, and ongoing support, your employees will be empowered to reach their full potential, driving innovation and success for your organization. Join us in shaping the future of learning and workforce development.
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#272727",
    color: "#FFF",
    minHeight: "80vh",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  title: {
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "20px",
    color:"#D9A128"
  },
  subtitle: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "20px",
  },
  list: {
    paddingLeft: 0,
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.6",
  },
};

export default Information;
