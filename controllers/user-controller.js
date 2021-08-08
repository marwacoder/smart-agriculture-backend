const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { User, InStock } = require('../models/')


const login = (req, res, next) => {
  const {email, password} = req.body
  try {
    User.findAll({ where: { email: email } }).then((user) => {
      if (user.length < 1) {
        return res.status(401).json({ errorMessage: "Invalid Username or Password" })
      }
      bcrypt.compare(password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({ errorMessage: "Invalid Username or Password" }) 
        } 
       if(result) {
      const token = jwt.sign({
          email: user[0].email, 
          password: user[0].password
      }, 'secrete',
      {
          expiresIn: 3600
      }
         ); 
         return res.status(200).json({
           user,
             token,
            expiresIn: 3600
        })
        }
        return res.status(401).json({ error: {
          msg: "Invalid Username or Password"
        } }) 
      })
    }).catch(error => {
        return res.status(400).json({
     error: {
       msg: 'Bad Request'
     }
    })
    })
  }
  catch (error) {
    return res.status(500).json({
      error:{
        msg: "Internal Server Error"
      } 
    })
  }
}


const index = async(req, res) => {
  try {
    const user = await User.findAll()
    if(user) return await res.status(200).json(user)
  }
  catch (error) {
    return res.status(500).json({
      error:{
        msg: "Internal Server Error"
      } 
    })
  }
  
}
const create = async(req, res) => {
    const { name, gender, address, email, phone, password, role } = req.body
    
    try {
       const user = await User.findAll({ where: { email: email } })
        if (user.length >= 1) {
            return res.status(409).json({
              error: {
                msg: "user Already Exist"
              }
             })
        }else
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                  error: {
                    msg: 'Server Error'
                  }
                })
            }else
            await User.create({
                name: name,
                gender: gender,
                address: address,
                email: email,
                phone: phone,
                password: hash,
                role: role
        })
        return res.status(200).json({msg: 'success'})
    })
    }
    catch (error) {
      return res.status(500).json({
        error:{
          msg: "Internal Server Error"
        } 
      })
    }
}

const show = (req, res) => {
  const { id } = req.params
  try {
     const user = User.findByPk(id, {
         include: [{model: InStock, as: "stocks"}]
    })
      if (!user ) {
        return res.status(404).json({ 
          error: {
            msg: 'User Not Found'
          }
         });
      }

      return res.status(200).json(user);
  }
  catch (error) {
    return res.status(500).json({
      error:{
        msg: "Internal Server Error"
      } 
    })
  }
}


const update = async(req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id, {
      include: [{model: InStock, as: "stocks"}]
 })
   if (!user ) {
     return res.status(404).json({ 
       error: {
         msg: 'User Not Found'
       }
      });
   }else

      await User.update({
          ...req.body
        },{ where: { id: id } })
        return res.status(200).json({msg: 'success'})
        
  }
  catch (error) {
    return res.status(500).json({
      error:{
        msg: "Internal Server Error"
      } 
    })
  }
  
}

const destroy = async(req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id, {
      include: [{model: InStock, as: "stocks"}]
 })
   if (!user ) {
     return res.status(404).json({ 
       error: {
         msg: 'User Not Found'
       }
      });
   }else
      await User.destroy({where: {id: id}})
      return res.status(200).json({msg: 'success'})
  }
  catch (error) {
    return res.status(500).json({
      error:{
        msg: "Internal Server Error"
      } 
    })
  }
  
}


module.exports = { index, create, show, destroy, update, login }
