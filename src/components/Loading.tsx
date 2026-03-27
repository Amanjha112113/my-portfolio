import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      const t1 = setTimeout(() => {
        setLoaded(true);
        const t2 = setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
        return () => clearTimeout(t2);
      }, 600);
      return () => clearTimeout(t1);
    }
  }, [percent, loaded]);

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded, setIsLoading]);

  return (
    <div className={`stitch-loading-wrapper ${clicked ? "fade-out" : ""}`}>
      {/* Background Texture Layer */}
      <div className="stitch-noise-overlay"></div>
      <div className="stitch-scanning-line"></div>

      {/* Background Marquee */}
      <div className="stitch-marquee-container">
        <Marquee speed={40} direction="left" className="stitch-display-font stitch-marquee-row stitch-marquee-1">
          SYSTEM_INITIALIZING SYSTEM_INITIALIZING SYSTEM_INITIALIZING
        </Marquee>
        <Marquee speed={50} direction="right" className="stitch-display-font stitch-marquee-row stitch-marquee-2">
          CORE_REPOS_ONLINE CORE_REPOS_ONLINE CORE_REPOS_ONLINE
        </Marquee>
        <Marquee speed={30} direction="left" className="stitch-display-font stitch-marquee-row stitch-marquee-3">
          ENCRYPTING_NODES ENCRYPTING_NODES ENCRYPTING_NODES
        </Marquee>
      </div>

      {/* Header Section */}
      <header className="stitch-header stitch-glass-panel">
        <div className="stitch-header-left">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="var(--primary)"><path d="M320-240v-80h-80l-80-80v-160l80-80h80v-80h320v80h80l80 80v160l-80 80h-80v80H320Zm80-160h160v-80h80v-80h-80v-80H400v80h-80v80h80v80Z"/></svg>
          <h1 className="stitch-display-font stitch-header-title">
            CODEWITHAMAN <span className="slash">//</span> <span className="stitch-tech-font version">v2.0.4-STABLE</span>
          </h1>
        </div>
        
        {/* Technical UI */}
        <div className="stitch-header-right">
          <div className="stitch-tech-font stitch-header-stats">
            <span>BUFFER_STATUS: NOMINAL</span>
            <span style={{color: 'var(--secondary)'}}>UPLINK_STRENGTH: 98%</span>
          </div>
          <div className="stitch-signal-box">
            <div className="stitch-signal-ping"></div>
          </div>
        </div>
      </header>

      {/* Main Content: Central Interactive Button */}
      <main className="stitch-main">
        {/* Status Indicator */}
        <div className="stitch-status-badge stitch-tech-font">
          <span className="stitch-status-dot"></span>
          AUTHORIZING_ACCESS_TOKEN
        </div>

        {/* Central Loading Trigger Area */}
        <div className="stitch-center-container">
          <div className="stitch-glow-bg"></div>
          
          <button className="stitch-main-panel stitch-glass-panel stitch-bloom-glow">
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <span className="stitch-display-font stitch-percent-text">
                {Math.min(percent, 100)}<span className="stitch-percent-symbol">%</span>
              </span>
              <span className="stitch-tech-font stitch-action-text">DEPLOYING_INSTANCE</span>
            </div>

            {/* Progress Bar */}
            <div className="stitch-progress-wrapper">
              <div 
                className="stitch-progress-fill" 
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            {/* Action / CTA */}
            {loaded && (
              <div className="stitch-continue-action">
                <span className="stitch-tech-font">CONTINUE_TO_CORE</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
              </div>
            )}
          </button>
          
          <div className="stitch-bracket-tl"></div>
          <div className="stitch-bracket-br"></div>
        </div>

        {/* Subtext Technical Info */}
        <div className="stitch-subtext-container">
          <div className="stitch-tech-font stitch-subtext-line1">
             <span className="stitch-cursor-blink"></span>
             FETCHING_METADATA: <span style={{color: 'var(--on-surface)'}}>projects/archive_2024.gz</span>
          </div>
          <p className="stitch-subtext-line2">
             Establishing a secure tunnel to the development server. Please wait while the architecture stabilizes.
          </p>
        </div>
      </main>

      {/* Side Navigation */}
      <div className="stitch-sidebar">
        <div className="stitch-tech-font stitch-sidebar-text">
          SECURE_ENVIRONMENT_001
        </div>
      </div>

      {/* Footer Meta */}
      <footer className="stitch-footer">
        <span className="stitch-tech-font stitch-footer-copy">© 2024 SYSTEM_ARCHITECT // ALL RIGHTS RESERVED</span>
        <div className="stitch-footer-links">
          <a className="stitch-tech-font" href="#">GITHUB</a>
          <a className="stitch-tech-font" href="#">SOURCE</a>
        </div>
      </footer>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
