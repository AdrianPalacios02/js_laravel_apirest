const url = 'http://localhost:8000/api/posts/';

const contenedor = document.querySelector('tbody');
let resultados = ''

const modalPost = new bootstrap.Modal(document.getElementById('exampleModal'))

const formPost = document.querySelector('form')
const title = document.getElementById('title')
const content = document.getElementById('content')
const user = document.getElementById('user')

let option = ''

btnCrear.addEventListener('click',()=>{
    title.value = ''
    content.value = ''
    user.value = ''
    modalPost.show()
    option = 'crear'
});

const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados +=  `<tr>
                            <td>${articulo.id}</td>
                            <td>${articulo.title}</td>
                            <td>${articulo.content}</td>
                            <td>${articulo.user_id}</td>
                            <td class="text-center">
                                <a class="btnEditar btn btn-success">Editar</a>
                                <a class="btnEliminar btn btn-danger">Eliminar</a>
                            </td>

                        </tr>`
    });
    contenedor.innerHTML = resultados
}
// mostrar valores

fetch(url).then(response => response.json())
        .then(data => mostrar(data))
        .catch(error => console.log(error))

const on = (element,event,selector,handler) => {
    console.log(selector);
    //handler es un controlador que se ejecuta en caso de un evento
    //forma de ejecutar js en caso de acciones de usuario
    element.addEventListener(event,e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
on(document,'click','.btnEliminar',e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)
    
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(url+id,{ 
            method: 'DELETE'
        }).then(res => res.json()).then( () => location.reload())
        alertify.success('Ok');
    },
    function(){
        alertify.error('Cancel');
    })
})
// editar
let idForm = 0
on(document,'click','.btnEditar',e => {
    const fila = e.target.parentNode.parentNode
    // const id = fila.firstElementChild.innerHTML
    idForm= fila.children[0].innerHTML
    const formTitle = fila.children[1].innerHTML
    const formContent = fila.children[2].innerHTML
    const formUser = fila.children[3].innerHTML
    // console.log(formTitle,formContent,formUser)

    title.value = formTitle
    content.value = formContent
    user.value = formUser

    option = 'editar'
    modalPost.show()
})


   formPost.addEventListener('submit', (e) => {
        e.preventDefault()
        if (option == 'crear') {
          fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:title.value,
                content:content.value,
                user_id:user.value
            })
          })
          .then(response => response.json())
          .then(data => {
            // console.log(data)
            const nuevoPost = []
                nuevoPost.push(data)
                mostrar(nuevoPost)
                alertify.success('Ok');
          })
        } 
        if (option == "editar") {
            fetch(url+idForm,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title:title.value,
                    content:content.value,
                    user_id:user.value
                })
            })
            .then(response => response.json())
                
            .then(response => location.reload())
            alertify.success('Ok');
        }
        modalPost.hide()
   })
