const { Driver, OutStock } = require('../models');




const index = async(req, res) => {
  try {
   const drivers = await Driver.findAll()
  if(drivers) return res.status(200).json(drivers)
  }
  catch (error) {
    return res.status(500).json({ msg: 'Server Error'});
  }
  
}




const addDriver = async (req, res) => {
    const { name, gender, phoneNumber, address, vehicleName, type, model, color, regNo } = req.body
    try {

      const driver = await Driver.findAll({where: {regNo}});

      if(driver.length > 0) return await res.status(409).json({msg: 'Driver Already Exist'})

      else {
            await Driver.create({
              id: id(),
                name,
                gender,
                address,
                phoneNumber,
                vehicleName,
                type,
                model,
                color,
                regNo
            })
            return res.status(200).json({msg: 'success'})
    }
  }
    catch (error) {
      return res.status(500).json({msg: 'Server Error'});
    }
}
    
    

const show = async(req, res) => {
  const { id } = req.params
  try {
     const driver = await Driver.findByPk(id, {
        include: [{model: OutStock, as: "stocks"}]
    })
  
      if (!driver) {
        return res.status(404).json({ error:{msg: 'Driver Not Found'}  });
      }

      return res.status(200).json(driver);

   
  }
  catch (error) {
    return res.status(500).json({ 
      error: {
        msg: 'Internal Server Error'
      }
     });
  }
}

const update = async(req, res) => {
  const { id } = req.params;
  const { name, gender, address,phoneNumber, vehicleName, type, model, color, regNo } = req.body
  try {
    const driver = await Driver.findByPk(id)

    if (!driver) {
      return res.status(404).json({msg: 'Driver Not Found'});
    }

      await Driver.update({
        name,
        gender,
        phoneNumber,
        address,
        vehicleName,
        type,
        model,
        color,
        regNo
        },{ where: { id } })
        return res.status(200).json({msg: 'success'})
   
  }
  catch (error) {
    return res.status(500).json({ msg: 'Server Error'});
  }
  
}

const destroy = async(req, res) => {
  const { id } = req.params
  try {
    const driver = await Driver.findByPk(id)

    if (!driver) {
      return res.status(404).json({ error:{msg: 'Driver Not Found'}  });
    }
      await Driver.destroy({where: {id}})
      return res.status(200).json({msg: 'success'})
  }
  catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error'});
  }
  
}


module.exports = { index, addDriver, show, destroy, update }
