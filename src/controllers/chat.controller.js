const getChat = async (req, res) => {
  try {

    res.render("chat", {} );
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      return res.status(err.statusCode).send(err);
    }

    res.sendStatus(500);
  }
};

export default {getChat};
