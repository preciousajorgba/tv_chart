const WebSocket = require('ws');
const Binance = require('binance-api-node').default;

// Initialize the Binance WebSocket client
const binanceWS = Binance().ws;

// Symbol and interval for which you want to receive WebSocket Kline data
const symbol = 'BTCUSDT';
const interval = '1m'; // 1 minute interval
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT })

// Subscribe to the WebSocket stream for Kline data
binanceWS.candles(symbol, interval, (candle) => {
    // Log the received Kline data
    console.log('Kline Data:', candle);

    // Send the raw Kline data to connected clients (frontend)
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(candle));
    });
});

// Log WebSocket server status
wss.on('listening', () => {
    console.log('WebSocket server is running on port 3000.');
});
