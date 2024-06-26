const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require("../models");
const cargarArchivo = async (req, res = response) => {
  // let sampleFile;
  // let uploadPath;

  //*enviado al middleware validar-archivo
  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   // res.status(400).send("No hay archivos que subir");
  //   res.status(400).json({ msg: "No hay archivos que subir" });
  //   return;
  // }

  //   console.log("req.files >>>", req.files); // eslint-disable-line

  //txt md

  //todo se agrega el try-catch ya que no controla la excepción - promise(reject) ~ el resolve pasa normal
  try {
    //Imagenes
    // const nombre = await subirArchivo(req.files, ["txt", "md"], "textos");
    const nombre = await subirArchivo(req.files, undefined, "imgs");

    res.json({
      nombre: nombre,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const actualizarImagen = async (req, res = response) => {
  //*Ç enviado al middleware validar-archivo
  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   res.status(400).json({ msg: "No hay archivos que subir" });
  //   return;
  // }

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto " });
  }

  //*limpiar imagenes previas
  if (modelo.img) {
    //* borrar la imagen del servidor

    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();
  res.json(modelo);
};

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      //* poner un mensaje o una imagen como 404(no se encuentra)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto " });
  }

  //*limpiar imagenes previas
  if (modelo.img) {
    //* borrar la imagen del servidor

    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );

    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const archivo = path.join(__dirname, "../assets/", "no-image.jpg");

  res.sendFile(archivo);
};

const actualizarImagenCloudinary = async (req, res = response) => {
  //*Ç enviado al middleware validar-archivo
  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   res.status(400).json({ msg: "No hay archivos que subir" });
  //   return;
  // }

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto " });
  }

  //*limpiar imagenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");

    const nombre = nombreArr[nombreArr.length - 1];

    const [public_id] = nombre.split(".");

    cloudinary.uploader.destroy(public_id);
    //* borrar la imagen del servidor
    //TODO limpieza pendiente
    // const pathImagen = path.join(
    //   __dirname,
    //   "../uploads",
    //   coleccion,
    //   modelo.img
    // );
    // if (fs.existsSync(pathImagen)) {
    //   fs.unlinkSync(pathImagen);
    // }
  }

  const { tempFilePath } = req.files.archivo;

  //* envio de img en la nube
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  //* envio de img de forma local al servidor
  // const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = secure_url;

  await modelo.save();
  // res.json(modelo);

  res.json(modelo);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
};

//todo si no se envia el archivo se queda pegado como revolverlo ~ tarea
