import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import TradingViewWidget from "./Chart";
import InvestmentsSuggestions from "./Stocks";

function App() {
  return (
    <>
      <header>
        <div className="logo">
          <h5>
            Lifted<span>Horizon</span>
          </h5>
        </div>
        <nav>
          <ul>
            <li>
              Sign In
              <FontAwesomeIcon icon={faRightToBracket} />
            </li>
            <li>
              Contact Us <FontAwesomeIcon icon={faEnvelope} />
            </li>
          </ul>
        </nav>
      </header>
      <div className="hero">
        <div className="container">
          <h1>
            <span>The center of the</span>
            <br />
            financial web
          </h1>
          <p>
            Browse major stocks, follow the trends and make your major financial
            decision here! <br />
            Research and find the right time to buy/sell your stocks
          </p>
        </div>
      </div>
      <TradingViewWidget />
      <div className="container">
        <InvestmentsSuggestions />
      </div>
    </>
  );
}

export default App;
