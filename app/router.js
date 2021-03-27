const orm = require( './orm' )
const sessionManager = require( './session-manager' )

// session checking middleware
async function authRequired(req, res, next){
   // check session set, and it's valid
   const sessionData = sessionManager.verifyAndLoad( req.headers.session )
   if( !sessionData ){
      console.log( `[${req.method} ${req.url}] .. [authRequired] invalid session, refusing (403)` )
      res.status(403).send({ status: false, message: 'Requires valid session. Please login again.' })
      return
   }
   console.log( `[${req.method} ${req.url}] .. [authRequired] session GOOD` )
   // session was good, pass info on, let's continue endpoint processing...
   req.sessionData = sessionData
   next()
}

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

   app.get('/api/users/logout', async function(req, res) {
      if( req.header.session ){
         sessionManager.remove( req.header.session )
      }
      console.log( ` .. removed session ${req.header.session}`)
      res.send( { status: true, message: 'Logout complete' } )
   })

   // all these endpoints require VALID session info
   app.get('/api/tasks', authRequired, async function(req, res) {
      const tasks = [
         { name: 'Task 1' },
         { name: 'Task 2' }
      ]

      res.send( { status: true, tasks } )
   })
}

module.exports = router