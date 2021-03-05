const orm = require( './orm' )
const sessionManager = require( './session-manager' )


function router( app ){
    app.post('/api/users/register', async function(req, res) {
        console.log( '[POST] register request:', req.body )
        let session=''
        const { status, userData, message }= await orm.userRegister( req.body )
        if( !status ){
            res.status(403).send( { status, message } )
            return
        }

        // generate a session-key
        session = sessionManager.create()
        console.log( `.. registration complete! session: ${session}` )

        res.send( { status, session, userData, message } )
    })

    app.post('/api/users/login', async function(req, res) {
        console.log( '[POST] login request:', req.body )
        let session=''
        const { status, userData, message }= await orm.userLogin( req.body.email, req.body.password )
        if( !status ){
            res.status(403).send( { status, message } )
            return
        }

        // generate a session-key
        session = sessionManager.create()
        console.log( `.. login complete! session: ${session}` )

        res.send( { status, session, userData, message } )
    })

    // all these endpoints require VALID session info
    app.get('/api/tasks', async function(req, res) {
        if( !sessionManager.checkValid( req.headers.session ) ){
            // sorry couldn't find that session!
            res.status(401).send( { status: false, code: 401, message: 'Sorry invalid session, login first!' })
            return
        }

        const tasks = [
            { name: 'Task 1' },
            { name: 'Task 2' }
        ]

        res.send( { status: true, tasks } )
    })

    app.get('/api/users/logout', async function(req, res) {
        if( !sessionManager.checkValid( req.headers.session ) ){
            res.status(401).send( { status: false, message: 'Sorry invalid session, login first!' })
            return
        }

        sessionManager.remove( req.header.session )
        console.log( ` .. removed session ${req.header.session}`)
        res.send( { status: true, message: 'Logout complete' } )
    })
}

module.exports = router
