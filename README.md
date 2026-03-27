# AI-Powered Portfolio Architecture 🚀

[![Platform-Web](https://img.shields.io/badge/Platform-Web-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://developer.chrome.com/)
[![React Framework](https://img.shields.io/badge/Framework-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![FastAPI Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/AI_Engine-Gemini_Pro-purple?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

A high-performance, 3D interactive portfolio architecture featuring a real-time AI Agent, secure communication channels, and advanced glassmorphic aesthetics. This project demonstrates the intersection of modern frontend engineering, backend orchestration, and generative AI.

---

## 🏗 Engineering Architecture

The portfolio is designed as a full-stack distributed system, ensuring high-fidelity interactions while maintaining sub-second response times for AI-driven features.

### 1. **Visual Engine (Frontend)**
*   **3D Interactive Model**: Powered by **Three.js** and **React Three Fiber (R3F)**, featuring a custom-modeled character with real-time mouse tracking and dynamic physics-based collisions.
*   **Aura Design System**: A custom "Stitch" inspired glassmorphic UI built with **Vanilla CSS** and **GSAP** for hardware-accelerated animations (60FPS).
*   **Dynamic Asset Pipeline**: Utilizes **Vite** for optimized build cycles and on-demand asset loading, significantly reducing First Contentful Paint (FCP).

### 2. **Orchestration Layer (FastAPI Backend)**
*   **Asynchronous SSE Streaming**: Implements Server-Sent Events (SSE) to deliver **Gemini 1.5 Flash** responses character-by-character, providing a "living" AI interaction experience.
*   **Secure Mail Transfer Protocol (SMTP)**: Orchestrates background email tasks for the contact form, ensuring non-blocking delivery and transmission confirmation.
*   **Rate Limiting & Safety**: Built-in **SlowAPI** middleware to prevent DDoS and protect the generative AI endpoints from exhaustion.

---

## 🚀 Key Capabilities

*   **⚡ AI System Architect**: A floating, edge-integrated chat agent that can discuss technical architecture, projects, and professional background in real-time.
*   **🔍 Direct Message Uplink**: A secure, glassmorphic contact interface with built-in validation and payload delivery tracking.
*   **🤩 Physics-Based Tech Stack**: An interactive "bubble" tech stack built with **Rapier** physics, allowing users to interact with skill nodes in 3D space.
*   **😀 Responsive Modernism**: Fully adaptive design that translates high-fidelity desktop effects into performant mobile experiences.

---

## ⚡ Performance Optimization

*   **Asset Decryption & Compression**: 3D models and textures are optimized to stay under the performance budget, ensuring smooth rendering on all devices.
*   **Network Efficiency**: Zero-gravity SSE streaming minimizes data overhead during AI conversations.
*   **Selective Hydration**: Critical UI elements are prioritized during the loading phase to ensure immediate interactivity.

---

## 🛡 Security & Privacy

*   **Zero Retention Policy**: The AI orchestration layer processes input in real-time without persistent storage of user messages.
*   **Credential Isolation**: Deployment and local development utilize strictly isolated environment variables (`.env`, `.gitignore`) to prevent credential leakage.
*   **Encrypted Uplink**: All form submissions and AI communications are secured via TLS/SSL.

---

## 🛠 Local Development & Startup

### Prerequisites
*   **Node.js**: 18.x or higher
*   **Python**: 3.10+
*   **API Access**: Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation Steps
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Amanjha112113/my-portfolio.git
    cd my-portfolio
    ```
2.  **Initialize Frontend**:
    ```bash
    npm install
    npm run dev
    ```
3.  **Initialize Backend**:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # Or venv\Scripts\activate on Windows
    pip install -r requirements.txt
    uvicorn app.main:app --reload
    ```

---
Developed and maintained by **amanjha112113**. 🚀
