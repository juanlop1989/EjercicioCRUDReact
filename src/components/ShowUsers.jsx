
import React, { useEffect, useState} from "react";
import axios from "axios";
import { alertaSuccess, alertaError, alertaWarning } from "../funciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const ShowUsers =() => {

    const [users, setUsers] = useState([])
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [avatar, setAvatar] = useState("")
    const [nameModal, setNameModal] = useState("")
    const [operation, setOperation] = useState(1)

    const url = "https://api.escuelajs.co/api/v1/users";


    //Obtener listado desde la Api
    const getUsers = async () => {               
        const responsive = await axios.get(url);
        setUsers(responsive.data)
    }

    useEffect(() => {getUsers() 
        getUsers()
    })

    /**
     * Abre el modal con los atributos del Usuario,si se va Editar se cargan los datos
     * @param {number} operation - N 1 para agregar, 2 para editar
     * @param {number} id 
     * @param {string} email 
     * @param {string} name 
     * @param {string} password 
     * @param {string} rol 
     * * @param {string} avatar 
     */
    const openModal = (operation, id, email, name, password, role, avatar) => {
        setId("")
        setEmail("")
        setName("")
        setPassword("")
        setRole("")
        setAvatar("")

        if (operation === 1){
            setNameModal("Registrar Usuario")
            setOperation(1)
        }else if (operation === 2) {
            setNameModal("Editar Usuario")
            setOperation(2)
            setId(id)
            setEmail(email)
            setName(name)
            setPassword(password)
            setRole(role)
            setAvatar(avatar)
        }
    }

    const enviarSolicitud = async (url, metodo, parametros = {}) =>{
        let obj = {
            method: metodo,
            url: url,
            data: parametros,
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json" 
            }
        }

        await axios(obj).then(() =>{
            let mensaje

            if (metodo === "POST") {
                mensaje = "Se guardó el usuario"
            } else if (metodo ==="PUT") {
                mensaje = "Se editó el usuario"
            }else if (metodo ==="DELETE") {
                mensaje = "Se eliminó el usuario"
            }
            alertaSuccess(mensaje)
            document.getElementById("cerrarModal").click()
            getUsers()
        }).catch((error) =>{
            alertaError(error.response.data.message)
        })
    }

    const validar = () =>{
        let payload
        let metodo
        let urlAxios

        if (email === ""){
            alertaWarning("Casilla del email en blanco", "email")
        } else if (name === ""){
            alertaWarning("Casilla del nombre en blanco", 'nombre')
        } else if (password === ""){
            alertaWarning("Casilla del password en blanco", "contrasena")
        } else if (role === ""){
            alertaWarning("Casilla del rol en blanco", "role")
        } else if (avatar === ""){
            alertaWarning("Casilla del avatar en blanco", "avatar")
        } else{
            payload = {
                email: email,
                name: name,
                password: password,
                role: role,
                avatar: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
            }

            if(operation === 1){
                metodo = "POST"
                urlAxios = "https://api.escuelajs.co/api/v1/users"
            }else{
                metodo = "PUT"
                urlAxios = `https://api.escuelajs.co/api/v1/users/${id}`
            }

            enviarSolicitud(urlAxios, metodo, payload)
        }
    }



    /**
     * Proceso para eliminar un usuario
     * @param {number} id - Identificador del usuario a eliminar
     */
    const deleteUser = (id) =>{
        let urlDelete = `https://api.escuelajs.co/api/v1/users/${id}`

        const MySwal = withReactContent(Swal)

        MySwal.fire({
            title: "¿Está seguro del eliminar al usuario?", 
            icon: "question",
            text: "No habrá marcha atrás",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed){
                setId(id)
                enviarSolicitud(urlDelete, "DELETE")
            }
        }).catch((error) =>{
            alertaError(error)
        })
    }

    return(
        <div className="App">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalUsuarios">
                            <i className="fa-solid fa-circle-plus" /> Añadir
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Correo Electrónico</th>
                                    <th>Nombre</th>
                                    <th>Password</th>
                                    <th>Rol</th>
                                    <th>Avatar</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-gruop-divider">
                                {
                                    users.map((users, i) => (
                                        <tr key={users.id}>
                                            <td>{i + 1}</td>
                                            <td>{users.email}</td>
                                            <td>{users.name}</td>
                                            <td>{users.password}</td>
                                            <td>{users.role}</td>
                                            <td>
                                                <img src={users.avatar} alt={`Avatar de ${users.name}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                            </td>
                                            <td>
                                                <button onClick={() => openModal(2, users.id, users.email, users.name, users.password, users.role, users.avatar)} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalUsuarios">
                                                    <i className="fa-solid fa-edit"></i>
                                                </button>
                                                <button onClick={() => deleteUser(users.id)} className="btn btn-danger m-1">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="modalUsuarios" className="modal fade" area-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{nameModal}</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i class="fa-regular fa-envelope"></i>
                                </span>
                                <input type="text" id="email" className="form-control" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i class="fa-solid fa-signature"></i>
                                </span>
                                <input type="text" id="nombre" className="form-control" placeholder="nombre" value={name} onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-lock"></i>
                                </span>
                                <input type="password" id="contrasena" className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                                </span>
                                <input type="text" id="role" className="form-control" placeholder="Rol" value={role} onChange={(e) => setRole(e.target.value)}></input>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i class="fa-solid fa-user-astronaut"></i>
                                </span>
                                <input type="text" id="avatar" className="form-control" placeholder="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)}></input>
                            </div>
                            
                          
                            <div className="modal-footer">
                                <button onClick={() => validar()} className="btn btn-success">
                                    <i className="fa-solid fa-floppy-disk"></i> Guardar
                                </button>
                                <button id="cerrarModal" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>                               
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowUsers;