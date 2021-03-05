/*
    note how we wrap our api fetch in this function that allows us to do some
    additional error / message handling for all API calls...
*/
function fetchJSON( url, method='get', data={} ){
    const fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            // looks for a session entry in localStorage, and if so pass it
            'Session': localStorage.session || ''
        }
    }
    // only attach the body for put/post
    if( method === 'post' || method === 'put' ) {
        fetchOptions.body = JSON.stringify( data )
    }

    return fetch( url,fetchOptions ).then( res=>res.json() )
}



function ifErrorShowAlert( result ){
    /* put the api result message onto the screen as a message if it exists */
    if( result.message ){
        const apiResultEl = document.querySelector('#apiMessage')
        apiResultEl.classList.remove( 'd-none', 'alert-success', 'alert-danger' )
        apiResultEl.classList.add( result.status ? 'alert-success' : 'alert-danger' )
        apiResultEl.innerHTML = result.message
        console.log( 'showing message: '+ result.message )
        setTimeout( function(){
            apiResultEl.classList.add( 'd-none' )
        }, 5000 )
    }
}
