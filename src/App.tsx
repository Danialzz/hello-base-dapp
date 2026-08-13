import { useAutoSwitchChain } from "./hooks/useAutoSwitchChain";
import { ToastProvider } from "./components/Toast";
import Topbar from "./components/Topbar";
import Board from "./components/Board";
import WriteForm from "./components/WriteForm";
import History from "./components/History";
import Footer from "./components/Footer";

function App() {
  useAutoSwitchChain();

  return (
    <>
      <div className="bg-mesh" aria-hidden="true"></div>
      <div className="bg-glow" aria-hidden="true"></div>
      <div className="bg-grid" aria-hidden="true"></div>
      <div className="noise" aria-hidden="true"></div>
      <canvas id="confetti" aria-hidden="true"></canvas>

      <ToastProvider>
        <Topbar />

        <main className="app">
          <section className="hero">
            <p className="hero-eyebrow">An on-chain message board</p>
            <h1 className="hero-title">
              Leave your mark <span>on Base</span>
            </h1>
            <p className="hero-sub">
              Read the board instantly — no wallet needed. Connect to write up to 280 characters, and
              your message becomes part of the chain — public and permanent.
            </p>
            <div className="hero-badges">
              <span className="hero-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                No signup
              </span>
              <span className="hero-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                280 characters
              </span>
              <span className="hero-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M2 12h20" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Forever on L2
              </span>
            </div>
          </section>

          <section className="grid">
            <Board />
            <div className="side">
              <WriteForm />
              <History />
            </div>
          </section>
        </main>

        <Footer />
      </ToastProvider>
    </>
  );
}

export default App;