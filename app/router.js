const orm = require("./orm");

function router( app ){
    app.get("/api/list/:type", async function(req, res) {
        const listType = req.params.type
        console.log( `[GET] getting list, type=${listType}`)
        const list = await orm.getList( listType )

        res.send( list )
    })

    app.post("/", async function(req, res) {
        console.log( `[POST] we received this data:`, req.body )
        await burger.add( req.body.burger )

        console.log( `new list of available burgers: `, burger.getAvailable() )
        res.redirect("/");
    });
}

module.exports = router
