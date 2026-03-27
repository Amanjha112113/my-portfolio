import { useState } from "react";
import { FaXTwitter, FaGithub, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("LOADING");
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("IDLE"), 4000);
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
    }
  };

  return (
    <footer className="footer-section" id="contact">
      <div className="footer-container">

        <div className="footer-content-split">
          
          {/* Left Side: Information & Socials */}
          <div className="footer-info-side">
            <div className="stitch-status-badge stitch-tech-font contact-badge">
              <span className="stitch-status-dot"></span>
              SECURE_COMMS_CHANNEL
            </div>
            
            <h2 className="stitch-display-font contact-heading">Let's build something <br/> <span className="text-highlight">extraordinary</span></h2>
            <p className="contact-subtext stitch-tech-font">
              <span className="stitch-cursor-blink"></span>
              TARGET_ACQUIRED: amanjha112113@gmail.com
            </p>

            <div className="footer-grid-mini">
              <div className="footer-col">
                <h4>NAVIGATION</h4>
                <a href="#home" data-cursor="disable">Home</a>
                <a href="#about" data-cursor="disable">About</a>
                <a href="#whatido" data-cursor="disable">What I Do</a>
                <a href="#work" data-cursor="disable">Work</a>
              </div>
              <div className="footer-col">
                <h4>SOCIALS</h4>
                <a href="https://github.com/Amanjha112113" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="https://www.linkedin.com/in/aman-jha-533293290/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://x.com/Amanjha11211" target="_blank" rel="noopener noreferrer">Twitter</a>
              </div>
              <div className="footer-col footer-col-icons">
                <h4>FOLLOW ME</h4>
                <div className="footer-icons">
                  <a href="https://x.com/Amanjha11211" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                  <a href="https://github.com/Amanjha112113" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/aman-jha-533293290/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                  <a href="https://www.youtube.com/channel/UCD5CGxldtX28iksiKRRLa_g" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                  <a href="https://www.instagram.com/amanjha112113/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form styled with Stitch aesthetics */}
          <div className="footer-form-side">
            <form className="stitch-glass-panel contact-form stitch-bloom-glow" onSubmit={handleSubmit}>
              <div className="form-header flex-align">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="var(--primary)"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                <h3 className="stitch-display-font">DIRECT_MESSAGE_UPLINK <span className="slash">//</span></h3>
              </div>
              
              <div className="form-group">
                <label className="stitch-tech-font">IDENTIFIER (NAME)</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="stitch-input stitch-tech-font" 
                  placeholder="Enter your name..."
                  required 
                  disabled={status === "LOADING"}
                />
              </div>

              <div className="form-group">
                <label className="stitch-tech-font">RETURN_PATH (EMAIL)</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="stitch-input stitch-tech-font" 
                  placeholder="name@server.com"
                  required 
                  disabled={status === "LOADING"}
                />
              </div>

              <div className="form-group">
                <label className="stitch-tech-font">PAYLOAD_DATA (MESSAGE)</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="stitch-input stitch-textarea stitch-tech-font" 
                  placeholder="How can we collaborate?..."
                  required
                  disabled={status === "LOADING"}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="stitch-submit-btn stitch-tech-font"
                disabled={status === "LOADING" || status === "SUCCESS"}
              >
                {status === "IDLE" && "INITIATE_HANDSHAKE"}
                {status === "LOADING" && "TRANSMITTING..."}
                {status === "SUCCESS" && "PAYLOAD_DELIVERED ✓"}
                {status === "ERROR" && "TRANSMISSION_FAILED ✕"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom border-top-glass">
          <p className="stitch-tech-font">© 2026 CODEWITHAMAN // ARCHITECTURE STABILIZED</p>
          <div className="footer-bottom-links stitch-tech-font">
            <a href="/terms" data-cursor="disable">TERMS_OF_USE</a> &amp; <a href="/privacy-policy" data-cursor="disable">PRIVACY_POLICY</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
