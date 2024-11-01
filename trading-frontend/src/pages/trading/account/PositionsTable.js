import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import WatchListItem from '../../../components/WatchListItem';

function createData(name, calories, size, carbs, protein) {
  return { name, calories, size, carbs, protein };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root': {
    cursor: "pointer"
  },
  '&:hover': {
    backgroundColor: 'black',
    opacity: 1,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    border: 0,
    color: "#89898b",
    fontSize: '10.5px'
  },
  [`&.${tableCellClasses.body}`]: {
    border: 0,
    color: "#89898b",
    fontSize: 10.5,
  },
}));

const TableBuyCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    border: 0,
    color: "#54c88c",
    fontSize: 10.5,
  }
}));

const TableSellCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    border: 0,
    color: "#ff6f6f",
    fontSize: 10.5,
  }
}));



const PositionsTable = (props) => {
  let totalProfit = 0;
  React.useEffect(() => {
    for (const row of props.positionData) {
      // Parsing all necessary values as floats
      const startPrice = parseFloat(row.startPrice) || 0;
      const size = parseFloat(row.size) || 0;
      const leverage = parseFloat(row.leverage) || 1; // Assuming 1 as a default leverage if not specified
      const commission = parseFloat(row.commission) || 0;
      const symbolIndex = props.symbols.findIndex(symbol => symbol.code === row.symbolName);
      const pipSize = symbolIndex !== -1 ? parseFloat(props.symbols[symbolIndex].pip_size) || 0.0001 : 0.0001; // Default pipSize if not found

      if (symbolIndex !== -1) {
        const currentPrice = row.type !== "Sell"
          ? parseFloat(props.bids[symbolIndex]) || 0
          : parseFloat(props.asks[symbolIndex]) || 0;

        const profit = ((row.type !== "Sell"
          ? startPrice - currentPrice
          : currentPrice - startPrice) / pipSize * size * leverage * -1) - commission;

        totalProfit += profit;
      }
    }

    console.log("Hello", totalProfit);
    props.setEquity(totalProfit);
  })
  return (
    <TableContainer sx={{ fontWeight: 600 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Instrument</StyledTableCell>
            <StyledTableCell>Position ID</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>Size</StyledTableCell>
            <StyledTableCell>Start Price</StyledTableCell>
            <StyledTableCell>Stop Loss</StyledTableCell>
            <StyledTableCell>Take Profit</StyledTableCell>
            <StyledTableCell>Current Price</StyledTableCell>
            <StyledTableCell>Commission</StyledTableCell>
            <StyledTableCell>Profit</StyledTableCell>
            <StyledTableCell>Final Profit</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.positionData.map((row, index) => (
            <StyledTableRow
              key={row.positionID || index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                <WatchListItem fromCurrency={row.symbolName.slice(0, 3)} toCurrency={row.symbolName.slice(3, 6)} />
              </StyledTableCell>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.createdAt}</StyledTableCell>
              <TableBuyCell>{row.type}</TableBuyCell>
              <StyledTableCell>{row.size}</StyledTableCell>
              <StyledTableCell>{row.startPrice}</StyledTableCell>
              <StyledTableCell>{row.stopLoss}</StyledTableCell>
              <StyledTableCell>{row.takeProfit}</StyledTableCell>
              <StyledTableCell>
                {isNaN(row.type != "Sell" ? 
                  props.bids[props.symbols.map(item => item.code).indexOf(row.symbolName)] : 
                  props.asks[props.symbols.map(item => item.code).indexOf(row.symbolName)]) 
                  ? 0.00 
                  : (row.type != "Sell" ? props.bids[props.symbols.map(item => item.code).indexOf(row.symbolName)] : props.asks[props.symbols.map(item => item.code).indexOf(row.symbolName)])}
              </StyledTableCell>
             <StyledTableCell>{row.commission}</StyledTableCell>
              <StyledTableCell>
                {isNaN((row.type != "Sell" ? 
                  row.startPrice - props.bids[props.symbols.map(item => item.code).indexOf(row.symbolName)] : 
                  props.asks[props.symbols.map(item => item.code).indexOf(row.symbolName)] - row.startPrice) / 
                  props.symbols.filter((symbol) => symbol.code == row.symbolName)[0].pip_size * 
                  row.size * row.leverage * -1)
                  ? 0.00
                  : ((row.type != "Sell" ? row.startPrice - props.bids[props.symbols.map(item => item.code).indexOf(row.symbolName)] : props.asks[props.symbols.map(item => item.code).indexOf(row.symbolName)] - row.startPrice) / props.symbols.filter((symbol) => symbol.code == row.symbolName)[0].pip_size * row.size * row.leverage * -1).toFixed(2)}
              </StyledTableCell>

              <StyledTableCell>
                {isNaN((row.type != "Sell" ? 
                  row.startPrice - props.bids[props.symbols.map(item => item.code).indexOf(row.symbolName)] : 
                  props.asks[props.symbols.map(item => item.code).indexOf(row.symbolName)] - row.startPrice) / 
                  props.symbols.filter((symbol) => symbol.code == row.symbolName)[0].pip_size * 
                  row.size * row.leverage * -1 - row.commission)
                  ? 0.00 
                  : ((row.type != "Sell" ? row.startPrice - props.bids[props.symbols.map(item => item.code).indexOf(row.symbolName)] : props.asks[props.symbols.map(item => item.code).indexOf(row.symbolName)] - row.startPrice) / props.symbols.filter((symbol) => symbol.code == row.symbolName)[0].pip_size * row.size * row.leverage * -1 - row.commission).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell><button onClick={() => { props.handleCancel(row.id) }} className='trading-btns'>Close</button><button onClick={() => { props.handleUpdate(row.id) }} className='trading-btns'>Update</button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PositionsTable;