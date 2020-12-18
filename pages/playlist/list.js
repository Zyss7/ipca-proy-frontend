import React, { useState } from "react";
import PrivateLayout from "@layouts/privateLayout";
import LoadingWrapper from "@components/Loadings/LoadingWrapper";
import Reproductor from "@components/playlist/reproductor"
import PlaylistVideoTable from "@components/playlist/playlistVideoTable";
import PlaylistTable from "@components/playlist/playlistTable";
const list = () => {
    const [cargando, setCargando] = useState(false);
    return (
        <PrivateLayout>
            <LoadingWrapper loading={cargando}>
                <main className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h1> Titulo de la Lista de Reproducción</h1>
                            <p>Descripción</p>
                            <p>La descripción por que fue <br/>
                            creada la lista de Reproduccion</p>
                        </div>
                        <div className="col">
                            <h1>Lista de Reproducción ¡Aqui van los videos!</h1>
                            <PlaylistVideoTable/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        <p>Aqui va el Reproductor para los Videos</p>
                            <Reproductor/>
                        </div>
                    </div> 
                </main>
            </LoadingWrapper>
        </PrivateLayout>
    );
}

export default list
