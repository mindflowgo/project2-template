// an external npm package we are using
// note we NEED DB_Name & DB_PWD in the .env file!
const db = require( './connection' )(process.env.DB_NAME,process.env.DB_PWD)


async function userRegister( userData ){
    // check if email already taken...
    const checkResult = await db.query( 'SELECT * FROM users WHERE email=? LIMIT 1',
        [ userData.email ] )
    if( checkResult.length>0 ){
        console.log( `x [userRegister] sorry that email ${userData.email} is already taken, rejecting` )
        return { status: false, userData: {}, message: 'Email already registered' }
    }

    const result = await db.query( 'INSERT INTO users (email,password,name) VALUES(?,?,?)',
        [ userData.email, userData.password, userData.name || '' ] )
    const status = ( result.insertId>0 )

    return { status, userData, message: '' }
}

async function userLogin( email, password ){
    const result = await db.query( 'SELECT * FROM users WHERE email=? AND password=? LIMIT 1',
        [ email, password ] )
    const status = ( result.length===1 )
    const userData = status ? result[0] : {}

    return { status, userData }
}

module.exports = {
    userRegister, userLogin
}