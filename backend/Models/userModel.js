const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
)

// static signup method
userSchema.statics.signup = async function (nom, email, password) {

  // validation
  if(!nom || !email || !password){
    throw Error('Tous les champs doivent être remplis')
  }
  if (!validator.isEmail(email)) {
    throw new Error ('Email invalide')
  }

  const exists = await this.findOne({email})

  if(exists) {
    throw Error ("L'email existe déjà!")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await this.create({nom, email, password: hashedPassword})

  return user


}
// static login method
userSchema.statics.login = async function (email, password) {
  if(!email || !password){
    throw Error('Tous les champs doivent être remplis')
  }
  const user = await this.findOne({email})

  if(!user) {
    throw Error ('Adresse Email incorrecte')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error ('Mot de passe incorrect')
  }
  return user
}


const User = mongoose.model('Users', userSchema)

module.exports = User