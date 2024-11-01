import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config';
import { useNavigate } from 'react-router-dom';
import { AdvancedChart } from 'react-tradingview-embed';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Box,
  CircularProgress,
  TextField,
  Grid
} from '@mui/material';
import {
  FlexibleXYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  LineSeries
} from 'react-vis';

const Dashboard = ({ openSidebar }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [orders, setOrders] = useState([]); // Store pending orders
  const token = localStorage.getItem('adminTrade');

  const [tradeData, setTradeData] = useState({
    symbol: 'NASDAQ:AAPL',
    stopLoss: '',
    takeProfit: '',
    trailingDrawdown: '',
    orderType: 'buy_limit'
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchAccounts();
    }
  }, [token, navigate]);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get(`${config.BackendEndpoint}/accounts`, {
        headers: { Authorization: token || '' }
      });
      setAccounts(res.data.users);
    } catch (err) {
      console.log('Error fetching accounts', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSubmit = () => {
    // Validate trade data before submitting
    if (!tradeData.stopLoss || !tradeData.takeProfit) {
      alert('Please provide Stop Loss and Take Profit values.');
      return;
    }
    const newOrder = { ...tradeData, id: Date.now() }; // Add a unique ID for each order
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    resetTradeData();
  };

  const cancelOrder = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTradeData((prev) => ({ ...prev, [name]: value }));
  };

  const resetTradeData = () => {
    setTradeData({
      symbol: 'NASDAQ:AAPL',
      stopLoss: '',
      takeProfit: '',
      trailingDrawdown: '',
      orderType: 'buy_limit'
    });
  };

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '30px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      style={{
        marginTop: '30px',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold'
      }}
    >
      <Typography
        variant="h4"
        style={{
          marginBottom: '40px',
          color: 'white',
          fontWeight: '1000',
          fontFamily: 'nycd'
        }}
      >
        Accounts Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* Left Side: Trade Input Form */}
        <Grid item xs={12} md={4}>
          <Box
            component={Paper}
            padding={3}
            style={{ backgroundColor: '#f5f5f5' }}
          >
            <Typography variant="h6">Trade Settings</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Symbol"
              name="symbol"
              value={tradeData.symbol}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Stop Loss"
              name="stopLoss"
              type="number"
              value={tradeData.stopLoss}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Take Profit"
              name="takeProfit"
              type="number"
              value={tradeData.takeProfit}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Trailing Drawdown"
              name="trailingDrawdown"
              type="number"
              value={tradeData.trailingDrawdown}
              onChange={handleChange}
            />
            <TextField
              select
              fullWidth
              margin="normal"
              label="Order Type"
              name="orderType"
              value={tradeData.orderType}
              onChange={handleChange}
              SelectProps={{ native: true }}
            >
              <option value="buy_limit">Buy Limit</option>
              <option value="buy_stop">Buy Stop</option>
              <option value="sell_limit">Sell Limit</option>
              <option value="sell_stop">Sell Stop</option>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleOrderSubmit}
            >
              Place Order
            </Button>
          </Box>
        </Grid>

        {/* Right Side: Chart */}
        <Grid item xs={12} md={8}>
          <div className="charty">
            <AdvancedChart
              widgetProps={{
                symbol: tradeData.symbol,
                theme: 'dark',
                studies: ['Moving Average'],
                toolbar_bg: '#f1f3f6',
                interval: 'D',
                locale: 'en',
                height: 500
              }}
              widgetPropsAny={{}}
            />{' '}
            {/* 
            <FlexibleXYPlot className="onChainChart" height={400}>
              <HorizontalGridLines />
              <LineSeries
                data={[
                  { x: 0, y: 234.34 },
                  { x: 10, y: 234.34 }
                ]} // Horizontal line at y = 234.34
                color="red" // Color of the line
                style={{ strokeWidth: 2 }} // Line thickness
              />
            </FlexibleXYPlot> */}
          </div>
          <Box marginTop={2}>
            <Typography variant="h6">Pending Orders</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Type</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Stop Loss</TableCell>
                    <TableCell>Take Profit</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.orderType}</TableCell>
                      <TableCell>{order.symbol}</TableCell>
                      <TableCell>{order.stopLoss}</TableCell>
                      <TableCell>{order.takeProfit}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
