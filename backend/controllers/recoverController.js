const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const recoverModel = require('../models/recover');

const recoverPassword = (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ error: 'Correo electrónico es requerido' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    usuariosModel.findUserByEmail(correo, (err, result) => {
        if (err) {
            console.error('Error obteniendo correo:', err);
            return res.status(500).json({ error: 'Error obteniendo correo' });
        }

        if (result.length === 0) {
            return res.status(404).send('No se encontró el correo');
        }

        usuariosModel.updateTokenAndExpiration(correo, token, expirationTime, (updateErr) => {
            if (updateErr) {
                console.error('Error actualizando token:', updateErr);
                return res.status(500).json({ error: 'Error actualizando token' });
            }

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'juanPruebasb@gmail.com',
                    pass: 'jtia vsxs vekf xdwz',
                },
            });

            const mailOptions = {
                from: 'juanPruebasb@gmail.com',
                to: correo,
                subject: 'Recuperación de contraseña',
                text: `Haz clic en el siguiente enlace para recuperar tu contraseña: http://localhost:3000/reset-password/${token}`,
            };

            transporter.sendMail(mailOptions, (sendMailErr, info) => {
                if (sendMailErr) {
                    console.error('Error enviando correo:', sendMailErr);
                    return res.status(500).send('Error enviando correo');
                }
                console.log(`Correo enviado: ${info.response}`);
                return res.status(200).send('Revisa tu correo para instrucciones sobre cómo restablecer tu contraseña');
            });
        });
    });
};

const resetPassword = (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).send('Contraseña es requerida');
    }

    usuariosModel.findUserByToken(token, (err, result) => {
        if (err) {
            console.error('Error verificando token:', err);
            return res.status(500).send('Error interno del servidor');
        }

        if (result.length === 0) {
            return res.status(404).send('Token inválido');
        }

        const { correo, token_time } = result[0];
        const currentTime = new Date();

        if (currentTime > token_time) {
            return res.status(404).send('El token ha expirado');
        }

        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error('Error al cifrar la contraseña:', hashErr);
                return res.status(500).send('Error interno del servidor');
            }

            usuariosModel.updatePassword(correo, hashedPassword, (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error actualizando la contraseña:', updateErr);
                    return res.status(500).send('Error actualizando la contraseña');
                }

                if (updateResult.affectedRows === 0) {
                    return res.status(404).send('Error actualizando la contraseña');
                }

                return res.status(200).send('Contraseña restablecida con éxito');
            });
        });
    });
};

module.exports = {
    recoverPassword,
    resetPassword
};
