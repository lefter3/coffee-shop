errorResponse = function (err, res) {
  console.log(err)
  switch (err.message) {
    case 'CONFLICT': {
      const msg = 'Item already exists';
      console.log(msg);
      return res.status(409).send(msg);
    }
    case 'NOT_FOUND': {
      const msg = 'Item not found';
      console.log(msg);
      return res.status(404).send(msg);
    }
    case 'MISSING_DATA': {
      const msg = 'Missing input data';
      console.log(msg);
      return res.status(400).send(msg);
    }
    case 'INVENTORY': {
      const msg = 'Missing Inventory';  
      console.log(msg);
      return res.status(409).send(msg);
    }
    default: {
      const msg = `Server error: ${err.message} \n ${err.reason}`;
      console.log(msg);
      return res.status(500).send(msg);
    }
  }
};

module.exports = {errorResponse}