const userModel = require('../Models/user')
const bcrypt = require('bcrypt')

const { createToken } = require('../JWT')
//registration
const register = async (req, res, next) => {
  const { username, password, email } = req.body

  try {
    const hash = await bcrypt.hash(password, 15)

    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    })
    if (existingUser) {
      console.log('already exists')
      return res
        .status(400)
        .json({ message: 'username or email already exists' })
    }
    const newUser = await userModel.create({
      username: username,
      password: hash,
      email: email,
    })

    res.status(200).json({
      data: newUser,
      message: 'New user added successfully',
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      error: error.message,
      message: 'Error creating a new user',
    })
  }
}
//login
const login = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const userLoggedIn = await userModel.findOne({ username: username })

    if (!userLoggedIn) {
      return res.status(400).json({ error: "User doesn't exist" })
    }
    // checking password
    const dbPassword = userLoggedIn.password
    console.log('Password:', password)
    console.log('DB Password:', dbPassword)

    // Ensure that both password and dbPassword are valid and non-empty
    if (!password || !dbPassword) {
      return res
        .status(400)
        .json({ error: 'Invalid password or hashed password' })
    }
    // compare the plain text password with the hashed password
    console.log('Password:', password)

    const match = await bcrypt.compare(password, dbPassword)

    if (!match) {
      return res
        .status(400)
        .json({ error: 'Username or password are incorrect' })
    }

    // create and send JWT token in a cookie
    const accessToken = createToken(userLoggedIn) 
    res.cookie('access-token', accessToken, {
      maxAge: 900000, // 15 minutes (in milliseconds)
      httpOnly: true,
    })

    // send a success response
    res.status(200).json({ message: 'You are logged in' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: error.message,
      message: 'Error during login',
    })
  }
}

//profile
const profile = async (req, res, next) => {
  res.json('profile')
  console.log('you are in the profile')
}
module.exports = { profile, login, register }
