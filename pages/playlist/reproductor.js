import LoadingWrapper from '@components/Loadings/LoadingWrapper';
import PrivateLayout from '@layouts/privateLayout';
import { getYoutubeImg } from '@utils/utils';
import usePlayList from 'hooks/usePlayList';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ReproductorContainer = ({ id }) => {
  const { getById } = usePlayList();
  const [playList, setPlayList] = useState(null);
  const [video, setVideo] = useState(null);

  const [loadingVideo, setLoadingVideo] = useState(false);

  useEffect(() => {
    setLoadingVideo(true);
    getById(id).then((res) => {
      setPlayList(res?.data);
      setVideo(res?.data?.videos[0]);
      setLoadingVideo(false);
    });
  }, []);

  const onClickVideoItem = (item) => () => {
    setLoadingVideo(true);
    setTimeout(() => {
      setVideo(item);
      setLoadingVideo(false);
    }, 200);
  };

  return (
    <PrivateLayout>
      <main className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <div className="card">
              <Link href="/playlist">
                <a className="btn btn-dark">Regresar</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <LoadingWrapper loading={loadingVideo} styles={{ height: '450px' }}>
              <iframe
                width="560"
                height="450"
                className="w-100"
                src={video?.iframeUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </LoadingWrapper>

            <div className="w-100">
              <h4>{video?.titulo}</h4>
              <p>{video?.descripcion}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <ul className="list-group">
              {playList?.videos?.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex flex-row w-100 pointer"
                  onClick={onClickVideoItem(item)}
                >
                  <img
                    className="img-fluid"
                    width="100"
                    src={getYoutubeImg(item?.v)}
                    alt=""
                  />

                  <h6 className="align-self-center ml-1 text-wrap text-break">
                    {item?.titulo}
                  </h6>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </PrivateLayout>
  );
};

ReproductorContainer.getInitialProps = ({ query }) => query;

export default ReproductorContainer;
