import React, { useState, useEffect, useRef } from "react";
import "./toggle.css";
import usa from "../../assets/images/usa.png";
import japan from "../../assets/images/japan.png";
import canada from "../../assets/images/canada.png";
import uk from "../../assets/images/uk.png";
import eu from "../../assets/images/eu.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faPencilAlt,
  faTimes,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

const ToggleButton = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const containerRef = useRef(null);
  const [activeWidth, setActiveWidth] = useState({ height: 0, width: 0 });

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  const calcWidth = (columns) => {
    if (containerRef.current) {
      const elWidth = containerRef.current.clientWidth;
      const elHeight = containerRef.current.clientHeight;
      return {
        width: elWidth / columns,
        height: elHeight,
      };
    }
    return { width: 0, height: 0 };
  };

  useEffect(() => {
    const updateWidth = () => setActiveWidth(calcWidth(4));
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const renderTable = () => {
    switch (selectedItem) {
      case 1:
        return (
          <table width="100%" style={{ marginTop: "20px" }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Instrument</th>
                <th>Side</th>
                <th>Size</th>
                <th>Entry/Market</th>
                <th>Stop Loss</th>
                <th>Take Profit</th>
                <th>Margin</th>
                <th>Exposure</th>
                <th>Created At(EET)</th>
                <th>Fee</th>
                <th>Swap</th>
                <th>Profit & Loss </th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>0.15</td>
                <td style={{ color: "#009982" }}>Buy</td>
                <td style={{ color: "#FB3746" }}>173.420 - 172.950</td>
                <td>-</td>
                <td>-</td>
                <td>$3.40</td>
                <td>$110.42</td>
                <td>2024/07/12 11:09:34</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#FB3746" }}>-$0.71</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>1.31</td>
                <td style={{ color: "#009982" }}>Buy</td>
                <td style={{ color: "#FB3746" }}>173.420 - 172.950</td>
                <td>-</td>
                <td>-</td>
                <td>$6.40</td>
                <td>$130.42</td>
                <td>2024/09/23 12:51:29</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#009982" }}>$0.34</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>0.21</td>
                <td style={{ color: "#FB3746" }}>Sell</td>
                <td style={{ color: "#009982" }}>133.420 - 142.950</td>
                <td>-</td>
                <td>-</td>
                <td>$3.40</td>
                <td>$164.42</td>
                <td>2024/09/24 14:57:24</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#FB3746" }}>-$0.71</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>0.11</td>
                <td style={{ color: "#FB3746" }}>Sell</td>
                <td style={{ color: "#009982" }}>123.420 - 124.950</td>
                <td>-</td>
                <td>-</td>
                <td>$2.50</td>
                <td>$194.42</td>
                <td>2024/03/24 11:37:23</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#009982" }}>$2.51</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        );
      case 2:
        return (
          <table width="100%" style={{ marginTop: "20px" }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Instrument</th>
                <th>Side</th>
                <th>Size</th>
                <th>Entry/Market</th>
                <th>Stop Loss</th>
                <th>Take Profit</th>
                <th>Margin</th>
                <th>Exposure</th>
                <th>Created At(EET)</th>
                <th>Fee</th>
                <th>Swap</th>
                <th>Profit & Loss </th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>1.31</td>
                <td style={{ color: "#009982" }}>Buy</td>
                <td style={{ color: "#FB3746" }}>173.420 - 172.950</td>
                <td>-</td>
                <td>-</td>
                <td>$6.40</td>
                <td>$130.42</td>
                <td>2024/09/23 12:51:29</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#009982" }}>$0.34</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>

              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>0.11</td>
                <td style={{ color: "#FB3746" }}>Sell</td>
                <td style={{ color: "#009982" }}>123.420 - 124.950</td>
                <td>-</td>
                <td>-</td>
                <td>$2.50</td>
                <td>$194.42</td>
                <td>2024/03/24 11:37:23</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#009982" }}>$2.51</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        );
      case 3:
        return (
          <table width="100%" style={{ marginTop: "20px" }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Instrument</th>
                <th>Side</th>
                <th>Size</th>
                <th>Entry/Market</th>
                <th>Stop Loss</th>
                <th>Take Profit</th>
                <th>Margin</th>
                <th>Exposure</th>
                <th>Created At(EET)</th>
                <th>Fee</th>
                <th>Swap</th>
                <th>Profit & Loss </th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>1.31</td>
                <td style={{ color: "#009982" }}>Buy</td>
                <td style={{ color: "#FB3746" }}>173.420 - 172.950</td>
                <td>-</td>
                <td>-</td>
                <td>$6.40</td>
                <td>$130.42</td>
                <td>2024/09/23 12:51:29</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#009982" }}>$0.34</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>0.21</td>
                <td style={{ color: "#FB3746" }}>Sell</td>
                <td style={{ color: "#009982" }}>133.420 - 142.950</td>
                <td>-</td>
                <td>-</td>
                <td>$3.40</td>
                <td>$164.42</td>
                <td>2024/09/24 14:57:24</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#FB3746" }}>-$0.71</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>0.11</td>
                <td style={{ color: "#FB3746" }}>Sell</td>
                <td style={{ color: "#009982" }}>123.420 - 124.950</td>
                <td>-</td>
                <td>-</td>
                <td>$2.50</td>
                <td>$194.42</td>
                <td>2024/03/24 11:37:23</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#009982" }}>$2.51</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        );
      case 4:
        return (
          <table width="100%" style={{ marginTop: "20px" }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Instrument</th>
                <th>Side</th>
                <th>Size</th>
                <th>Entry/Market</th>
                <th>Stop Loss</th>
                <th>Take Profit</th>
                <th>Margin</th>
                <th>Exposure</th>
                <th>Created At(EET)</th>
                <th>Fee</th>
                <th>Swap</th>
                <th>Profit & Loss </th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>0.15</td>
                <td style={{ color: "#009982" }}>Buy</td>
                <td style={{ color: "#FB3746" }}>173.420 - 172.950</td>
                <td>-</td>
                <td>-</td>
                <td>$3.40</td>
                <td>$110.42</td>
                <td>2024/07/12 11:09:34</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#FB3746" }}>-$0.71</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>1.31</td>
                <td style={{ color: "#009982" }}>Buy</td>
                <td style={{ color: "#FB3746" }}>173.420 - 172.950</td>
                <td>-</td>
                <td>-</td>
                <td>$6.40</td>
                <td>$130.42</td>
                <td>2024/09/23 12:51:29</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#009982" }}>$0.34</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center", padding: "10px" }}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={usa} style={{ width: " 20px", height: "15px" }} />
                    <p>USAJPY</p>
                    <img
                      src={japan}
                      style={{ width: "20px", height: "15px" }}
                    />
                  </div>
                </td>
                <td>0.21</td>
                <td style={{ color: "#FB3746" }}>Sell</td>
                <td style={{ color: "#009982" }}>133.420 - 142.950</td>
                <td>-</td>
                <td>-</td>
                <td>$3.40</td>
                <td>$164.42</td>
                <td>2024/09/24 14:57:24</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "#FB3746" }}>-$0.71</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "7px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTimes} />
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="toggle-button">
      <div className="button-group" ref={containerRef}>
        <div
          role="button"
          className={`toggle-button-item ${selectedItem === 1 ? "active" : ""}`}
          onClick={() => handleItemClick(1)}
        >
          Open
        </div>
        <div
          role="button"
          className={`toggle-button-item ${selectedItem === 2 ? "active" : ""}`}
          onClick={() => handleItemClick(2)}
        >
          Pending
        </div>
        <div
          role="button"
          className={`toggle-button-item ${selectedItem === 3 ? "active" : ""}`}
          onClick={() => handleItemClick(3)}
        >
          Trades
        </div>
        <div
          role="button"
          className={`toggle-button-item ${selectedItem === 4 ? "active" : ""}`}
          onClick={() => handleItemClick(4)}
        >
          History
        </div>
      </div>
      <div
        className="slide-animation"
        style={{
          transform: `translateX(calc(${selectedItem - 1} * 100%))`,
          width: `${activeWidth.width}px`,
          height: `${activeWidth.height}px`,
        }}
      />
      <div className="table-container">{renderTable()}</div>
    </div>
  );
};

export default ToggleButton;
