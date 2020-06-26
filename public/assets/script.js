/* unlike node where we can pull in packages with npm, or react, for normal 
    webpages, we can use a cool resource called unpkg */

async function apiCall( url, method='get', data={} ){
    let settings = {
        method,
        headers: { 'Content-Type': 'application/json' }
    }
    // only attach the body for put/post
    if( method === 'post' || method === 'put' ) settings.body = JSON.stringify( data )

    const result = await fetch( url,settings ).then( res=>res.json() )
    if( result.status && result.message ){
        const apiResultEl = document.querySelector('#apiMessage')
        apiResultEl.innerHTML = result.message
        apiResultEl.classList.remove( 'd-none' )
        console.log( 'showing message: '+ result.message )
        setTimeout( function(){ apiResultEl.classList.add( 'd-none' )}, 5000 )
    } else if( !result.status && result.message ){
        alert( 'Problems: ' + result.message )
    }
    
    return result
}

async function mainApp(){
    console.log( `[mainApp] starting...` )

    taskList()

}

function toggleTaskForm( forceHide=false ){
    const formEl = document.querySelector('#taskForm')
    if( !forceHide || formEl.classList.contains('d-none') ){
        formEl.classList.remove( 'd-none' )
    } else {
        formEl.classList.add( 'd-none' )
    }
}

async function taskList( due='' ){
    const taskList = await apiCall( '/api/tasks' + (due ? `/${due}` : '') )
    console.log( `[taskList] due='${due}'`, taskList )

    const listEl = document.querySelector('#list')
    listEl.innerHTML = ''

    taskList.forEach( function( task ){
        listEl.innerHTML += `
        <li class="list-group-item">
            <div class="float-right p-0">
                <button onClick="taskDelete(${task.id})" class="border-0 btn-transition btn btn-outline-danger"> <i class="fa fa-trash"></i> </button>
            </div>
            <div class="todo-indicator bg-${task.priority}"></div>
            <h3 class="text-primary">${task.info}</h3>
            <small class="text-muted">${task.due ? 'Due: '+moment(task.due).format('MMM Do, YYYY') : '' }</small>
        </li>
        `
    })    
}

async function taskDelete( id ){
    const deleteResponse = await apiCall( `/api/tasks/${id}`, 'delete' )
    console.log( `[taskDelete] `, deleteResponse )

    taskList()
}

async function saveForm( event ){
    event.preventDefault()

    const formData = {
        priority: document.querySelector('#taskPriority').value,
        info: document.querySelector('#taskInfo').value,
        due: document.querySelector('#taskDue').value
    }
    // clear form
    document.querySelector('#taskPriority').value = ''
    document.querySelector('#taskInfo').value = ''
    document.querySelector('#taskDue').value = ''
    console.log( `[saveForm] formData=`, formData )

    const saveResponse = await apiCall( '/api/tasks', 'post', formData )
    console.log( `[saveResponse] `, saveResponse )

    // refresh the list
    taskList()

    // hide the form
    toggleTaskForm( true )
}