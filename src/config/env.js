const config = {
	url:{
		api: {
			auth: process.env.API_AUTH,
			clientConsolidator: process.env.API_CLIENT_CONSOLIDATOR,
			clientReader: process.env.API_CLIENT_READER,
			favListConsolidator: process.env.API_FAV_LIST_CONSOLIDATOR,
			favListReader: process.env.API_FAV_LIST_READER
		}
	},
	app:{
		port: process.env.APP_PORT,
		env: process.env.APP_ENV
	}
};

module.exports = config;