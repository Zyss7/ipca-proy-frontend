import LoadingWrapper from '@components/Loadings/LoadingWrapper';
import PlaylistAdmin from '@components/playlist/PlaylistAdmin';
import PlaylistAlumno from '@components/playlist/PlaylistAlumno';
import PrivateLayout from '@layouts/privateLayout';
import usePlayList from 'hooks/usePlayList';
import useUsuario from 'hooks/useUsuario';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

const PlaylistContainer = () => {
  const [cargando, setCargando] = useState(false);
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);
  const { getListasTable, eliminarPlayList } = usePlayList();
  const { usuario } = useUsuario();

  const { addToast, removeAllToasts } = useToasts();

  const init = () => {
    setCargando(true);
    getListasTable().then((res) => {
      if (res?.transaccion) {
        setData(res?.data);
      }
      setCargando(false);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const onConfirmDelete = (id) => async (evt) => {
    removeAllToasts();
    setCargando(true);
    await eliminarPlayList(id);
    init();
  };

  const onClickEliminar = ({ id }) => () => {
    addToast(
      <React.Fragment>
        <h6>
          Esta seguro de eliminar esta lista de reproduccion, tenga en cuenta que si la
          elimina, no la podra recuperar.
        </h6>
        <div className="d-flex flex-row justify-content-around w-100">
          <Button
            variant="danger"
            style={{ width: '50px' }}
            className="p-button-danger btn-sm"
            label="SI"
            onClick={onConfirmDelete(id)}
          />
          <Button
            style={{ width: '50px' }}
            className="btn-sm p-button-info"
            label="NO"
            onClick={removeAllToasts}
          />
        </div>
      </React.Fragment>,
      {
        appearance: 'info',
      },
    );
  };

  return (
    <PrivateLayout>
      <LoadingWrapper loading={cargando}>
        {usuario?.isDocente && (
          <div className="d-inline-flex mx-md-3">
            <Button
              onClick={() => setShowList(!showList)}
              icon="pi pi-eye"
              label="Ver demo"
            />
          </div>
        )}
        {!showList && usuario?.isDocente && (
          <PlaylistAdmin data={data} onClickEliminar={onClickEliminar} />
        )}
        {(showList || usuario?.isAlumno) && <PlaylistAlumno data={data} />}
      </LoadingWrapper>
    </PrivateLayout>
  );
};

export default PlaylistContainer;
