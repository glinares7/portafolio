const { response, request } = require("express");
const Usuario = require("../models/usuario");

const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    //* verificar si el correo existe

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: " usuario/ password  no son correctos - correo",
      });
    }

    //* verificar si el usuario esta activo en la BD
    if (!usuario.estado) {
      return res.status(400).json({
        msg: " usuario/ password  no son correctos - estado:false",
      });
    }

    //* verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: " usuario/ password  no son correctos - password",
      });
    }
    //*  generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "login ok",
      usuario,
      token,
      // correo,
      // password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // // Si el usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
