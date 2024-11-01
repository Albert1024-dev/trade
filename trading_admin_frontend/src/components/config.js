if (process.env.NODE_ENV !== 'production') {
    module.exports = {
        BackendEndpoint: 'http://185.224.139.104:8000/admin',
    };
}
else {
    module.exports = {
        BackendEndpoint: 'http://backend.lasertrader.co/admin',
    };
}

