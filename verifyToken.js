const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const  token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied')


    try {
        const verification = jwt.verify(token,"gkuybbghashafafgyb")
        req,auth =  verification
        next()
    } catch (error) {
        res.status(400).send('Token Error')
    }
}