import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Engineer Trainee</h4>
                <h5>Microsoft GenSpark</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Architected Azure AI solutions using Cognitive Services, Azure ML,
              and Computer Vision APIs for real-world enterprise projects.
              Optimized ML workflows through model evaluation and testing.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineering Intern</h4>
                <h5>AlgoTutor</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed a real-time MERN chat application supporting 100+
              concurrent users. Implemented WebSocket-based messaging, reducing
              response time by 30%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in AI & Data Science</h4>
                <h5>Sri Eshwar College of Engineering</h5>
              </div>
              <h3>2028</h3>
            </div>
            <p>
              Pursuing a degree in Artificial Intelligence and Data Science.
              Learning and building systems across Deep Learning, RAG, NLP,
              and Multi-Agent frameworks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
