import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCog,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import "./WatchList.css";

import usa from "../assets/images/usa.png";
import japan from "../assets/images/japan.png";
import canada from "../assets/images/canada.png";
import uk from "../assets/images/uk.png";
import eu from "../assets/images/eu.png";
import { Translate } from "@mui/icons-material";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Import the times icon

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "rgb(220, 220, 220)",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "rgb(40, 40, 40)",
    color: "rgb(200, 200, 200)",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(27, 27, 27)",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "rgba(27, 27, 27, 0.4)",
    cursor: "pointer",
  },
  height: "54px",
}));

const TradingViewWidget = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [on, setOnState] = React.useState(false);
  const toggle = () => setOnState((o) => !o);

  const filteredSymbols = [
    {
      country1: usa,
      assetName: "USDJPY",
      country2: japan,
      bid: "141.749",
      ask: "141.765",
      spread: 12,
      dayHigh: 141.797,
      dayLow: 141.665,
    },
    {
      country1: usa,
      assetName: "USACAN",
      country2: canada,
      bid: "0.349",
      ask: "0.765",
      spread: 11,
      dayHigh: 0.797,
      dayLow: 0.665,
    },
    {
      country1: uk,
      assetName: "UNKUSA",
      country2: usa,
      bid: "0.67556",
      ask: "0.65453",
      spread: 19,
      dayHigh: 0.68455,
      dayLow: 0.68564,
    },
    {
      country1: uk,
      assetName: "UNKEUR",
      country2: eu,
      bid: "12.2332",
      ask: "13.2122",
      spread: 9,
      dayHigh: 12.2123,
      dayLow: 12.1241,
    },
    {
      country1: japan,
      assetName: "JPKCAN",
      country2: canada,
      bid: "124.322",
      ask: "125.353",
      spread: 2,
      dayHigh: 125.233,
      dayLow: 125.232,
    },
    {
      country1: uk,
      assetName: "UNKJPK",
      country2: japan,
      bid: "2.12332",
      ask: "3.2122",
      spread: 11,
      dayHigh: 4.2123,
      dayLow: 2.1041,
    },
    {
      country1: usa,
      assetName: "USACAN",
      country2: canada,
      bid: "0.349",
      ask: "0.765",
      spread: 11,
      dayHigh: 0.797,
      dayLow: 0.665,
    },
    {
      country1: uk,
      assetName: "UNKUSA",
      country2: usa,
      bid: "0.67556",
      ask: "0.65453",
      spread: 19,
      dayHigh: 0.68455,
      dayLow: 0.68564,
    },
    {
      country1: uk,
      assetName: "UNKEUR",
      country2: eu,
      bid: "12.2332",
      ask: "13.2122",
      spread: 9,
      dayHigh: 12.2123,
      dayLow: 12.1241,
    },
    {
      country1: japan,
      assetName: "JPKCAN",
      country2: canada,
      bid: "124.322",
      ask: "125.353",
      spread: 2,
      dayHigh: 125.233,
      dayLow: 125.232,
    },
    {
      country1: uk,
      assetName: "UNKEUR",
      country2: eu,
      bid: "12.2332",
      ask: "13.2122",
      spread: 9,
      dayHigh: 12.2123,
      dayLow: 12.1241,
    },
    {
      country1: japan,
      assetName: "JPKCAN",
      country2: canada,
      bid: "124.322",
      ask: "125.353",
      spread: 2,
      dayHigh: 125.233,
      dayLow: 125.232,
    },
    {
      country1: uk,
      assetName: "UNKJPK",
      country2: japan,
      bid: "2.12332",
      ask: "3.2122",
      spread: 11,
      dayHigh: 4.2123,
      dayLow: 2.1041,
    },
    {
      country1: usa,
      assetName: "USACAN",
      country2: canada,
      bid: "0.349",
      ask: "0.765",
      spread: 11,
      dayHigh: 0.797,
      dayLow: 0.665,
    },
    {
      country1: uk,
      assetName: "UNKUSA",
      country2: usa,
      bid: "0.67556",
      ask: "0.65453",
      spread: 19,
      dayHigh: 0.68455,
      dayLow: 0.68564,
    },
  ];

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedRow(null);
    setOpen(false);
  };

  return (
    <div className="WatchListBox" style={{ backgroundColor: "black" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          backgroundColor: "black",
        }}
      >
        <div
          className="form-layout"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0px",
          }}
        >
          <div className="search-wrapper">
            <FontAwesomeIcon icon={faSearch} className="form-icon" />
            <input
              type="text"
              className="input-field"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="select-wrapper">
            <select
              className="select-field"
              style={{ width: "100%" }}
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
            >
              <option value="">All</option>
              <option value="">Forex Var Major</option>
              <option value="">Forex Pro Major</option>
              <option value="">Mini Indexes</option>
              <option value="">Forex Var Cross</option>
              <option value="">Forex Pro Cross</option>
              <option value="">Mini Forex</option>
              <option value="">US Shares</option>
              <option value="">Metals</option>
              <option value="">Indexes</option>
              <option value="">Cryptos</option>
              <option value="">EU Shares</option>
              <option value="">Energies</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="form-icon1" />
          </div>

          <button className="gear-button">
            <FontAwesomeIcon icon={faCog} />
          </button>
        </div>
      </Box>
      <TableContainer
        component={Paper}
        className="TableContainer"
        sx={{ marginTop: "-18px" }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Instruments</StyledTableCell>
              <StyledTableCell>Bid</StyledTableCell>
              <StyledTableCell>Ask</StyledTableCell>
              <StyledTableCell>Spread</StyledTableCell>
              <StyledTableCell>Day High</StyledTableCell>
              <StyledTableCell>Day Low</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSymbols.map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={() => handleClickOpen(row)}
                className="table-row"
              >
                <StyledTableCell component="th" scope="row">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={row.country1}
                      alt=""
                      style={{
                        width: "20px",
                        height: "15px",
                        marginRight: "5px",
                      }}
                    />
                    <span>{row.assetName}</span>
                    <img
                      src={row.country2}
                      alt=""
                      style={{
                        width: "20px",
                        height: "15px",
                        marginLeft: "5px",
                      }}
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell>{row.bid}</StyledTableCell>
                <StyledTableCell>{row.ask}</StyledTableCell>
                <StyledTableCell>{row.spread}</StyledTableCell>
                <StyledTableCell>{row.dayHigh}</StyledTableCell>
                <StyledTableCell>{row.dayLow}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <div
          style={{
            width: "500px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <div>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  transform: "translate(34%, -6%)",
                  color: "black",
                  fontSize: "24px",
                }}
              >
                ?
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Sell</div>
            <div style={{ fontSize: "18px" }}>0.01 lots of</div>
            <div
              style={{
                fontSize: "18px",
                backgroundColor: "white",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{ transform: "translate(23%, -11%)", color: "black" }}
              />
            </div>
            <div style={{ fontSize: "10px" }}>XRPUSD</div>
            <div>
              <img
                src={selectedRow?.country1}
                alt=""
                style={{ width: "20px", height: "15px" }}
              />
            </div>
          </div>
          <div>at Market Price</div>
          <div
            style={{
              width: "100%",
              backgroundColor: "#171b25",
              color: "white",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div style={{ padding: "10px", paddingBottom: "10px" }}>
                <p style={{ fontSize: "12px" }}>One-click trading</p>
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
                <p>{on ? "On" : "Off"}</p>
                <div style={{ marginTop: "5px", marginRight: "10px" }}>
                  <button
                    className={on ? "button on" : "button off"}
                    onClick={toggle}
                  >
                    <span className="pin" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              color: "white",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <button
              style={{
                flex: 1,
                backgroundColor: "#171b25",
                borderRadius: "5px",
                padding: "7px",
              }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              style={{
                flex: 1,
                backgroundColor: "#009982",
                borderRadius: "5px",
                padding: "7px",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
        {/* <DialogTitle>{selectedRow?.assetName} Details</DialogTitle>
        <DialogContent>
          <p>Bid: {selectedRow?.bid}</p>
          <p>Ask: {selectedRow?.ask}</p>
          <p>Spread: {selectedRow?.spread}</p>
          <p>Day High: {selectedRow?.dayHigh}</p>
          <p>Day Low: {selectedRow?.dayLow}</p>
          {/* Add more details as needed 
        </DialogContent> */}
      </Dialog>
    </div>
  );
};

export default TradingViewWidget;
