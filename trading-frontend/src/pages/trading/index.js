import React, { useEffect, useState } from "react";
import TradingViewChart from "../../components/TradingViewChart";
import WatchList from "../../components/WatchList";
import "./index.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AccountManagement from "./account/AccountManagement";
import { useSelector } from "react-redux";
import Logout from "../../components/Auth/Logout";
import { fetchSymbols, fetchTradingDatas } from "../../utils/api";
import { CircularProgress } from "@mui/material";
import "./trading.scss";
import usaflag from "../../assets/images/usa.png";
import japanflag from "../../assets/images/japan.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Toggle from "../../components/toggle";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#101013",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "10px",
}));

const Trading = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [bid, setBid] = useState([0, 0, 0, 0, 0, 0]);
  const [ask, setAsk] = useState([0, 0, 0, 0, 0, 0]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = React.useState(10000);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const user = useSelector((state) => state.auth.user);

  const [value, setValue] = useState(0.01);

  const increment = () => {
    setValue((prevValue) => parseFloat((prevValue + 0.001).toFixed(3)));
  };

  const decrement = () => {
    setValue((prevValue) => parseFloat((prevValue - 0.001).toFixed(3)));
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     setSymbols(await fetchSymbols());
  //     const datas = await fetchTradingDatas();
  //     setAccounts(datas.accounts);
  //   }
  //   fetchData();
  // }, [balance]);

  const handleAccountChange = (e) => {
    const selectedAccount = accounts.find(
      (account) => account.token === e.target.value
    );
    if (selectedAccount) {
      localStorage.setItem("tradeToken", selectedAccount.token);
    }
    setLoading(true);
    //  setTimeout(() => setLoading(false), 5000);
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <CircularProgress className="circular-progress" color="success" />
        </div>
      ) : (
        <div>
          {/* <div style={{ height: "50px" }}>
            <div style={{ float: "right", width: "40%" }}>
              <Logout />
              <select
                onChange={handleAccountChange}
                className="account-switch"
                defaultValue={localStorage.getItem("tradeToken")}
              >
                {accounts.map((account, index) => (
                  <option key={index} value={account.token}>
                    {account.id} - {account.type} ({account.balance})
                  </option>
                ))}
              </select>
            </div>
          </div> */}
          <div className="trading-header">
            <div className="trading-header-icon">
              {/* <img src="" /> */}
              <h2>LaserTrader</h2>
            </div>
            <div className="trading-header-number">
              <div className="trading-header-number-each-title">
                <div className="trading-header-number-each-title-name">
                  <p>Balance</p>
                </div>
                <div className="trading-header-number-each-title-price">
                  <p>$4,999.93</p>
                </div>
              </div>
              <div className="trading-header-number-each-title">
                <div className="trading-header-number-each-title-name">
                  <p>Profit & Loss</p>
                </div>
                <div className="trading-header-number-each-title-price">
                  <p style={{ color: "red" }}>-$0.16</p>
                </div>
              </div>
              <div className="trading-header-number-each-title">
                <div className="trading-header-number-each-title-name">
                  <p>Equity</p>
                </div>
                <div className="trading-header-number-each-title-price">
                  <p>$4,999.76</p>
                </div>
              </div>
              <div className="trading-header-number-each-title">
                <div className="trading-header-number-each-title-name">
                  <p>Margin Used</p>
                </div>
                <div className="trading-header-number-each-title-price">
                  <p>$1.99</p>
                </div>
              </div>
              <div className="trading-header-number-each-title">
                <div className="trading-header-number-each-title-name">
                  <p>Margin Avalates</p>
                </div>
                <div className="trading-header-number-each-title-price">
                  <p>$4,997.76</p>
                </div>
              </div>
              <div className="trading-header-number-each-title">
                <div className="trading-header-number-each-title-name">
                  <p>Margin Lows</p>
                </div>
                <div className="trading-header-number-each-title-price">
                  <p>249,998.11%</p>
                </div>
              </div>
              <div className="trading-header-number-each-title">
                <div className="trading-header-number-each-title-name">
                  <p>Credit</p>
                </div>
                <div className="trading-header-number-each-title-price">
                  <p>$0.00</p>
                </div>
              </div>
            </div>
            <div className="trading-header-status">
              <div className="trading-header-feedback">
                <button className="trading-header-feedback-button">
                  Feedback
                </button>
              </div>
              <div className="trading-header-total-status">
                <div className="trading-header-status-number">136629</div>
                <div className="trading-header-status-icon">
                  <div className="trading-header-status-icon-color"></div>
                  <p>Network Status</p>
                </div>
              </div>
              <div className="trading-header-total-dollar">
                <div className="trading-header-total-dollar-button"></div>
                <p>$</p>
              </div>
            </div>
          </div>
          <div className="trading-page-container" style={{ marginTop: "20px" }}>
            <div style={{ width: "40px" }}></div>
            <div className="tradingview-container">
              <div className="chart-container">
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "30px",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        color: "white",
                        fontSize: "12px",
                        marginBottom: "20px",
                        marginLeft: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={usaflag}
                          style={{ width: " 20px", height: "15px" }}
                        />
                        <p>USAJPY</p>
                        <img
                          src={japanflag}
                          style={{ width: "20px", height: "15px" }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p style={{ color: "grey" }}>Day High:</p>
                        <p>131.797</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p style={{ color: "grey" }}>Day Low:</p>
                        <p>141.665</p>
                      </div>
                    </div>
                    <Item sx={{ height: isAuth ? "550px" : "700px" }} p={5}>
                      <TradingViewChart
                        selectedSymbol={selectedSymbol}
                        setSelectedSymbol={setSelectedSymbol}
                      />
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Item sx={{ marginTop: "-20px" }}>
                      <WatchList
                        height={isAuth ? "450" : "700"}
                        symbols={symbols}
                        bid={bid}
                        ask={ask}
                        setSelectedSymbol={setSelectedSymbol}
                      />
                    </Item>
                    <div
                      style={{
                        width: "95%",
                        height: "35px",
                        backgroundColor: "#171b25",
                        borderRadius: "5px",
                        margin: "10px",
                        marginLeft: "20px",
                        marginTop: "2px",
                      }}
                      onClick={toggleCollapse}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "30px",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          color: "white",
                          fontSize: "12px",
                          marginLeft: "30px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            marginTop: "32px",
                          }}
                        >
                          <img
                            src={usaflag}
                            style={{ width: " 20px", height: "15px" }}
                          />
                          <p>USAJPY</p>
                          <img
                            src={japanflag}
                            style={{ width: "20px", height: "15px" }}
                          />
                        </div>
                      </div>
                    </div>
                    {isCollapsed && (
                      <div
                        style={{
                          backgroundColor: "#202020",
                          padding: "10px",
                          margin: "10px 30px",
                          borderRadius: "5px",
                          color: "white",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              borderRadius: "10px",
                            }}
                          >
                            <button
                              style={{
                                width: "100%",
                                flex: "1",
                                backgroundColor: "#171b25",
                                color: "white",
                                padding: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              Market
                            </button>
                            <button
                              style={{
                                width: "100%",
                                flex: "1",
                                backgroundColor: "#171b25",
                                color: "white",
                                padding: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              Pending
                            </button>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              borderRadius: "10px",
                              marginTop: "10px",
                            }}
                          >
                            <button
                              style={{
                                width: "100%",
                                flex: "1",
                                backgroundColor: "#171b25",
                                color: "#FB3746",
                                padding: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              Sell
                            </button>
                            <button
                              style={{
                                width: "100%",
                                flex: "1",
                                backgroundColor: "#171b25",
                                color: "#009982",
                                padding: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              Buy
                            </button>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "63px",
                              borderRadius: "10px",
                              marginTop: "10px",
                              width: "100%",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "white",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p>StopLoss</p>
                              <input
                                type="checkbox"
                                style={{ width: "fit-content" }}
                              />
                            </button>

                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "white",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p>TakeProfit</p>
                              <input
                                type="checkbox"
                                style={{ width: "fit-content" }}
                              />
                            </button>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              borderRadius: "10px",
                              marginTop: "3px",
                              width: "100%",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "grey",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p>0.56895</p>
                            </button>
                            <p style={{ fontSize: "12px" }}>Price</p>
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "grey",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p style={{ fontSize: "12px" }}>0.58099</p>
                            </button>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              borderRadius: "10px",
                              marginTop: "3px",
                              width: "100%",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "grey",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p>0.60</p>
                            </button>
                            <p style={{ fontSize: "12px" }}>P&L</p>
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "grey",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p>0.60</p>
                            </button>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              borderRadius: "10px",
                              marginTop: "3px",
                              width: "100%",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "grey",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p>602</p>
                            </button>
                            <p style={{ fontSize: "12px" }}>Ticks</p>
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "grey",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p>602</p>
                            </button>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              borderRadius: "10px",
                              marginTop: "3px",
                              width: "100%",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "grey",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p>0.06</p>
                            </button>
                            <p style={{ fontSize: "12px" }}>Balance</p>
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#171b25",
                                color: "grey",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                            >
                              <p>0.06</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    >
                      <p style={{ color: "#FB3746" }}>141.708</p>
                      <p style={{ color: "white" }}>$1.99/0.04</p>
                      <p style={{ color: "#009982" }}>141.720</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px",
                        marginLeft: "20px",
                        marginRight: "20px",
                        marginTop: "10px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#FB3746",
                          color: "black",
                          borderRadius: "5px",
                          width: "150px",
                          height: "40px",
                        }}
                      >
                        Sell
                      </button>
                      <div
                        style={{
                          width: "100%",
                          height: "40px",
                          backgroundColor: "#171b25",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 30px",
                        }}
                      >
                        <p
                          style={{
                            color: "white",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                          onClick={decrement}
                        >
                          -
                        </p>
                        <p style={{ color: "white", fontSize: "16px" }}>
                          {value.toFixed(3)}
                        </p>
                        <p
                          style={{
                            color: "white",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                          onClick={increment}
                        >
                          +
                        </p>
                      </div>
                      <button
                        style={{
                          backgroundColor: "#009982",
                          color: "black",
                          borderRadius: "5px",
                          width: "150px",
                          height: "40px",
                        }}
                      >
                        Buy
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Toggle />
              </div>
              {/* <Box p={1}></Box>
              {isAuth && (
                <Box
                  sx={{
                    borderRadius: "10px",
                    marginBottom: "0px",
                    flex: "33.01 1 0px",
                  }}
                  key="account-management"
                >
                  <AccountManagement
                    setIsAuth={setIsAuth}
                    selectedSymbol={selectedSymbol}
                    setSelectedSymbol={setSelectedSymbol}
                    symbols={symbols}
                    bid={bid}
                    setBid={setBid}
                    ask={ask}
                    setAsk={setAsk}
                    balance={balance}
                    setBalance={setBalance}
                  />
                </Box>
              )} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trading;
