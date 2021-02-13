import useCustomRouter from "hooks/useCustomRouter";
import _ from "lodash";
import { normalizeText } from "normalize-text";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

const PlaylistAlumno = ({ data }) => {
  const [aguja, setAguja] = useState("");
  const router = useCustomRouter();
  const [listas, setListas] = useState(data);
  const buscarPredicate = (source, path, aguja) => {
    return normalizeText(_.get(source, path, "")).includes(
      normalizeText(aguja)
    );
  };
  const onChangeBuscar = (evt) => {
    const buscar = evt.target.value;
    setAguja(buscar);

    if (buscar !== "") {
      const newData = data?.filter?.(
        (item) =>
          `${item?.videos?.length} videos`.includes(buscar) ||
          buscarPredicate(item, "titulo", buscar) ||
          buscarPredicate(item, "descripcion", buscar) ||
          item.videos?.find?.(
            (video) =>
              buscarPredicate(video, "titulo", buscar) ||
              buscarPredicate(video, "url", buscar) ||
              buscarPredicate(video, "descripcion", buscar)
          )
      );
      return setListas(newData);
    }
    return setListas(data);
  };

  return (
    <main className='container-fluid'>
      <div className='row justify-content-center'>
        <div className='col-md-10 col-lg-9 col-xl-8'>
          <div className='p-inputgroup'>
            <span className='p-inputgroup-addon'>Buscar:</span>
            <InputText
              placeholder='Ingresa aquí lo que deseas buscar'
              value={aguja}
              onChange={onChangeBuscar}
            />
          </div>
        </div>
      </div>

      <div className='row mt-3 justify-content-center'>
        <div className='col-11 border'>
          <div className='row justify-content-center my-3'>
            {listas?.map?.((item, index) => (
              <div className='col-sm-6 col-md-4 col-xl-3 my-2' key={index}>
                <div className='card' style={{ height: "350px" }}>
                  <div className='card-header w-100'>
                    <div className='card-title text-center'>
                      <h6>{item?.titulo}</h6>
                    </div>
                  </div>
                  <div
                    className='card-body'
                    style={{ padding: "0.5rem 0.5rem 0.5rem 0.5rem" }}>
                    <div
                      className='d-flex flex-column justify-content-between'
                      style={{ height: "100%" }}>
                      <p
                        style={{
                          height: "100px",
                          width: "100%",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: "4",
                          WebkitBoxOrient: "vertical",
                        }}>
                        {item?.descripcion}
                      </p>

                      <p className='text-right'>
                        {item?.videos?.length} vídeos
                      </p>
                    </div>
                  </div>
                  <div className='card-footer'>
                    <button
                      className='btn btn-info btn-block btn-sm'
                      onClick={router.goTo(
                        `/playlist/reproductor?id=${item?.id}`
                      )}>
                      Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlaylistAlumno;
