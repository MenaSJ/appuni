const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/usuarios');

// Función para solicitar recuperación de contraseña
const recoverPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Correo electrónico es requerido' });
    }

    const recoveryToken = crypto.randomBytes(20).toString('hex');
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('No se encontró el correo electrónico');
        }

        user.recoveryToken = recoveryToken;
        user.tokenExpiration = tokenExpiration;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'juanPruebasb@gmail.com',
                pass: 'jtia vsxs vekf xdwz', // Considera usar variables de entorno para la contraseña
            },
        });

        const mailOptions = {
            from: 'juanPruebasb@gmail.com',
            to: email,
            subject: 'Recuperación de contraseña',
            text: `Haz clic en el siguiente enlace para recuperar tu contraseña: http://localhost:3000/reset-password/${recoveryToken}`,
        };

        transporter.sendMail(mailOptions, (sendMailErr, info) => {
            if (sendMailErr) {
                console.error('Error enviando correo:', sendMailErr);
                return res.status(500).send('Error enviando correo');
            }
            console.log(`Correo enviado: ${info.response}`);
            return res.status(200).send('Revisa tu correo para instrucciones sobre cómo restablecer tu contraseña');
        });

    } catch (error) {
        console.error('Error en la recuperación de contraseña:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función para restablecer la contraseña
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).send('Contraseña es requerida');
    }

    try {
        const user = await User.findOne({ recoveryToken: token });

        if (!user) {
            return res.status(404).send('Token inválido');
        }

        const currentTime = new Date();
        if (currentTime > user.tokenExpiration) {
            return res.status(404).send('El token ha expirado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.recoveryToken = null;
        user.tokenExpiration = null;
        await user.save();

        return res.status(200).send('Contraseña restablecida con éxito');

    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        return res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    recoverPassword,
    resetPassword
};
