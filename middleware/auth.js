const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json('Not authorized');

    try {
        const verify = jwt.verify(token, process.env.JWT_SCERET_KEY);
        req.user = verify;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json("invalid token");
    }
}

module.exports = auth;