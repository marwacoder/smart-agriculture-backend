const {  OutStock, InStock, Driver } = require('../models');
const eyeD = require('shortid')


const index = async(req, res) => {
    try {
      const stocks = await OutStock.findAll({include: {model: Driver, as: 'driver'}})
      if(stocks) return res.status(200).json(stocks)
    }
    catch (error) {
      return res.status(500).json({
        msg: "Server Error" + error
      })
    }
    
  }


const dispatchStock = async(req, res) => {
    const {quantity,  driverId, id} = req.body
    try {
      const stock = await InStock.findByPk(id)
  
        if (!stock) {
          return res.status(404).json({ 
              msg: 'Stock Not Found'
           });
        }
  
        if (parseInt(stock.quantity) >= quantity) {
        await   OutStock.create({
          id: eyeD(),
          name: stock.name,
          category: stock.category,
          quantity: quantity,
          price: stock.price,
          totalFund: stock.price * quantity,
          driverId
           })
        await  InStock.update({
              quantity: parseInt(stock.quantity) - quantity,
              totalFund: parseInt(stock.totalFund) - (parseInt(stock.price) * quantity)
             }, { where: { id } })
             return res.status(200).json({msg: 'success'})
    
        } else {
        return await res.status(507).json({
                  msg: 'Insufficient Stock'
              })
        }
  
    }
    catch (error) {
      return res.status(500).json({ 
          msg: 'Server Error'+ error
       });
    }
  }


  
const show = (req, res) => {
    const { id } = req.params
    try {
      OuStock.findByPk(id)
      .then((stock) => {
        if (!stock) {
          return res.status(404).json({ msg: 'OutStock Not Found' });
        }
  
        return res.status(200).json(stock);
  
      })
        
      .catch(() => {
        return res.status(400).json({msg: "Bad Request"})
      });
    }
    catch (error) {
      return res.status(500).json({
        msg: "Server Error"
      })
    }
  }
  
  
  
  const update = async(req, res) => {
    const { id } = req.params;
    const { name, category, quantity, price } = req.body
  
    try {
      const stock = await OutStock.findByPk(id)
      if(!stock) return await res.status(404).json({ msg: 'Stock Not Found' });
      
       await OutStock.update({
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
      const stock = await OutStock.findByPk(id)
      if(!stock) return await res.status(404).json({ msg: 'Stock Not Found' });
  
        await OutStock.destroy({where: {id}})
        return await res.status(200).json({msg: 'success'})
    }
    catch (error) {
      return res.status(500).json({
        msg: "Server Error"
      })
    }
    
  }
  
  
  module.exports = { index, dispatchStock, show, destroy, update }