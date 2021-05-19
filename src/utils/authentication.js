module.exports = {
	authentication: (req, res, next) => {
		var authheader = req.get('authorization');

		if (!authheader) {
			var err = new Error('You are not authenticated!');
			res.setHeader('WWW-Authenticate', 'Basic');
			err.status = 401;
			return next(err);
		}

		var auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
		var user = auth[0];
		var pass = auth[1];

		if (user == process.env.AUTH_USER_NAME && pass == process.env.AUTH_PASSWORD) {
			// If Authorized user
			next();
		} else {
			var err = new Error('You are not authenticated!');
			res.setHeader('WWW-Authenticate', 'Basic');
			err.status = 401;
			return next(err);
		}
	}
};