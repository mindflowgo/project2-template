const uuid = require( 'uuid' )

// track valid sessions in memory
let userSessions = []

function checkValid( requestSession ){
    if( userSessions.length<1 ) {
        return false
    }
    console.log( `[checkValid] ${requestSession} ? ${userSessions.indexOf( requestSession )>-1}` )
    return ( userSessions.indexOf( requestSession )>-1 )
}

function create(){
    session = uuid.v4()
    // remember this session
    userSessions.push( session )
    return session
}

function remove( userSession ){
    // remove the current one
    userSessions = userSessions.filter( s=>s!==userSession )
}

module.exports = { checkValid, create, remove }