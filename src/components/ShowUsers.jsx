
import React, { useEffect, useState} from "react";
import axios from "axios";


const ShowUsers =() => {
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
                                    <th>Correo</th>
                                    <th>Contraseña</th>
                                    <th>Nombre</th>
                                    <th>Rol</th>
                                    <th>Avatar</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-gruop-divider">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="modalUsuarios" className="modal fade" area-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">Agregar / Editar Usuario</label>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowUsers;