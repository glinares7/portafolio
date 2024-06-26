const { response } = require("express");
const { Categoria } = require("../models");

//* obtenerCategorias -paginado  -  total - populate

const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre"),
  ]);

  res.json({
    total,
    categorias,
  });
};

//* obtenerCategoria  - populate {}

// 63f779b7b7eb3e861609b926
// 63f79164208596a9c55f8aec
const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categorias = await Categoria.findById(id).populate("usuario", "nombre");

  res.json({
    categorias,
  });
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  //*generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //* guardar DB

  await categoria.save();
  res.status(201).json(categoria);
};

//* actualizarCategoria

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  res.json(categoria);
};

//* borrarCategoria - estado:false

const borrarCategoria = async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(categoria);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
