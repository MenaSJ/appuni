const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios');

const handleLogin = async (req, res) => {
    const { username, pwd } = req.body;
    console.log(req.body)
    if (!username || !pwd) return res.status(400).json({ 'message': 'Username o Contrasena requreridos' });

    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        const email = result.email;
        const estado = result.estado;
        const id = result._id;
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ roles, accessToken, email, estado, id });

    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    handleLogin
}