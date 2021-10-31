const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const  token = req.header('auth-token');
    if(!token) return res.status(401).json({
        message: 'Access Denied'
    })


    try {
        const verification = jwt.verify(token,"gkuybbghashafafgyb")
        req,auth =  verification
        next()
    } catch (error) {
        res.status(400).json({
            message: 'Token Error'
        })
    }
}