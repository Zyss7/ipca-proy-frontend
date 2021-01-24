import LoadingWrapper from "@components/Loadings/LoadingWrapper";
import PlaylistAdmin from "@components/playlist/PlaylistAdmin";
import PlaylistAlumno from "@components/playlist/PlaylistAlumno";
import PrivateLayout from "@layouts/privateLayout";
import { useUsuario } from "context/UsuarioContext";
import usePlayList from "hooks/usePlayList";
import React, { useEffect, useState } from "react";

const PlaylistContainer = () => {
  const [cargando, setCargando] = useState(false);
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);
  const { getListasTable } = usePlayList();
  const [usuario] = useUsuario();

  useEffect(() => {
    setCargando(true);
    getListasTable().then((res) => {
      if (res?.transaccion) {
        setData(res?.data);
      }
      setCargando(false);
    });
  }, []);

  return (
    <PrivateLayout>
      <LoadingWrapper loading={cargando}>
        {usuario?.isDocente && (
          <button onClick={() => setShowList(!showList)}>Ver demo</button>
        )}
        {!showList && usuario?.isDocente && <PlaylistAdmin data={data} />}
        {(showList || usuario?.isAlumno) && <PlaylistAlumno data={data} />}
      </LoadingWrapper>
    </PrivateLayout>
  );
};

export default PlaylistContainer;
