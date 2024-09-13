
import React, { useEffect, useState} from "react";
import axios from "axios";


const ShowUsers =() => {

    const [users, setUsers] = useState([])
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [rol, setRol] = useState("")
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
     * @param {string} rol 
     */
    const openModal = (operation, id, email, name, rol) => {
        setId("")
        setEmail("")
        setName("")
        setRol("")

        if (operation === 1){
            setNameModal("Registrar Usuario")
            setOperation(1)
        }else if (operation === 2) {
            setNameModal("Editar Usuario")
            setOperation(2)
            setId(id)
            setEmail(email)
            setName(name)
            setRol(rol)
        }
    }

    return(
        <div className="App">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalUsuarios">
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
                                            <td>Imagen</td>
                                            <td>
                                                <button onClick={() => openModal(2, users.id, users.email, users.name, users.rol)} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalUsuarios">
                                                    <i className="fa-solid fa-edit"></i>
                                                </button>
                                                <button className="btn btn-danger m-1">
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
                            minuto 54
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-gift"></i>
                                </span>
                                <input type="text" id="nombre" className="form-control" placeholder="Nombre"></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                <i class="fa-solid fa-wand-magic-sparkles"></i>
                                </span>
                                <input type="text" id="rol" className="form-control" placeholder="Rol"></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-lock"></i>
                                </span>
                                <input type="text" id="contrasena" className="form-control" placeholder="Contraseña"></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i class="fa-solid fa-user-astronaut"></i>
                                </span>
                                <input type="text" id="avatar" className="form-control" placeholder="Avatar"></input>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success">
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