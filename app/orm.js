const mysql = require("mysql");

class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}

const db = new Database({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  insecureAuth : true
});

function selectList( criteria={} ){
    return db.query( "SELECT * FROM list "+( criteria ? "WHERE ? " : "" ), criteria )
}

function insertItem( name ){
    return db.query( "INSERT INTO list SET ? ", 
        { name, complete: false } )
}

function updateItem( id, field, value ){
    return db.query( "UPDATE list SET ? WHERE id=?", 
        [ { [field]: value}, id ] )
}

function deleteItem( id ){
    return db.query( "DELETE FROM list WHERE id=?", [ id ] )
}

module.exports = {
    insertItem, insertItem, updateItem, deleteItem
}