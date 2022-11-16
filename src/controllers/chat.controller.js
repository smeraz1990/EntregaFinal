const getChat = async (req, res) => {
  try {
    const response = {
      usuariolog: req.user._id.toString(),
      username: req.user.username,
      nombre: req.user.nombre,
      avatar: req.user.avatar
    }
    res.render("chat",response);
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      return res.status(err.statusCode).send(err);
    }

    res.sendStatus(500);
  }
};

export default {getChat};
