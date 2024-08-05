const bcrypt = require('bcrypt');
const User = require('../models/usuarios');

const handleNewUser = async (req, res) => {
    const { estado, email, username, pwd } = req.body;
    console.log(req.body)
    if (!estado || !email || !username || !pwd) {
        return res.status(400).json({ 'message': 'Todos los campos son requeridos' });
    }
    const duplicate = await User.findOne({ username: username }).exec();
    const duplicateEmail = await User.findOne({ email: email }).exec();
    if (duplicate || duplicateEmail) return res.sendStatus(409); //conflict
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const result = await User.create({
            "estado":estado,
            "email":email,
            "username": username,
            "password": hashedPwd
        })
        console.log(result)
        res.status(201).json({'success':`New user ${username} created!`})
    } catch (err) {
        res.status(500).json({'message':err.message})
    }
}

module.exports = {
    handleNewUser
} 