const { InStock, OutStock } = require('../models')
const id = require('shortid')



const index = async(req, res) => {
  try {
    const stocks = await InStock.findAll()
    if(stocks) return res.status(200).json(stocks)
  }
  catch (error) {
    return res.status(500).json({
      msg: "Server Error"
    })
  }
  
}

const addStock = async(req, res) => {
    const { name, category, quantity, price } = req.body
    console.log(req.body)
    try {
      const stock = await InStock.findAll({where: {name}});

      if(stock.length > 0) return await res.status(409).json({msg:'Stock Already Exist'})
        else {
          await InStock.create({
            id: id(),
            name: name,
            category: category,
            quantity: quantity,
            price: price,
            totalFund: price * quantity
        })
        return await res.status(200).json({msg:'Success'})
        }
           
    }
    catch (error) {
        return res.status(500).json({msg: "Server Error"})
    }
}
    



const show = (req, res) => {
  const { id } = req.params
  try {
    InStock.findByPk(id)
    .then((stock) => {
      if (!stock) {
        return res.status(404).json({ errorMessage: 'InStock Not Found' });
      }

      return res.status(200).json(stock);

    })
      
    .catch(() => {
      return res.status(400).json({errorMessage: "Bad Request"})
    });
  }
  catch (error) {
    return res.status(500).json({
      errorMessage: "Internal Server Error"
    })
  }
}



const update = async(req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price } = req.body

  try {
    const stock = await InStock.findByPk(id)
    if(!stock) return await res.status(404).json({ msg: 'Stock Not Found' });
    
     await InStock.update({
            name,
            category,
            quantity,
            price
      },{ where: { id } })
      return await res.status(200).json({msg: 'success'})
      
  }
  catch (error) {
    return res.status(500).json({
      msg: "Server Error"
    })
  }
  
}

const destroy = async(req, res) => {
  const { id } = req.params
  try {
    const stock = await InStock.findByPk(id)
    if(!stock) return await res.status(404).json({ msg: 'Stock Not Found' });

      await InStock.destroy({where: {id}})
      return await res.status(200).json({msg: 'success'})
  }
  catch (error) {
    return res.status(500).json({
      msg: "Server Error"
    })
  }
  
}


module.exports = { index, addStock, show, destroy, update }
