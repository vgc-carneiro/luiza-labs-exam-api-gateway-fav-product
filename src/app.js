const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const config = require('./config/env');
const httpProxy = require('express-http-proxy');
const cors = require('cors');

const authProxy = httpProxy(config.url.api.auth);

const clientReaderProxy = httpProxy(config.url.api.clientReader);
const clientConsolidatorProxy = httpProxy(config.url.api.clientConsolidator);

const favListReaderProxy = httpProxy(config.url.api.favListReader);
const favListConsolidatorProxy = httpProxy(config.url.api.favListConsolidator);

const app = express();

if (config.app.env != 'prod') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors());
// if helmet is not enable use app.disable('x-powered-by');

app.use('/luiza-labs-exam/auth', authProxy);
app.use('/luiza-labs-exam/client', clientReaderProxy);
app.use('/luiza-labs-exam/client-consolidator', clientConsolidatorProxy);
app.use('/luiza-labs-exam/fav-list', favListReaderProxy);
app.use('/luiza-labs-exam/fav-list-consolidator', favListConsolidatorProxy);

// catch 404 and forward to error handler
app.use(function(req, res) {
	res.status(404).json({message: 'Request not valid'});
	// next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({message: 'Request is not valid'});
	// res.render('error');
});

module.exports = app;
