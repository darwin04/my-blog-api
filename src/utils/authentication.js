module.exports = {
	/**
	 * Function used to validate requests are coming in with basic auth i.e.
	 * the Authorization Header is set. If not set, we send back `www-authenticate` to
	 * prompt user for credentials
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 * @returns 
	 */
	authentication: (req, res, next) => {
		var authheader = req.get('authorization');

		if (!authheader) {
			var err = new Error('You are not authenticated!');
			// Sending back `www-authenticate` to prompt browser for credentials
			res.setHeader('WWW-Authenticate', 'Basic');
			err.status = 401;
			return next(err);
		}

		var auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
		var user = auth[0];
		var pass = auth[1];

		// Pulling in creds from env vars to check against client user input
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