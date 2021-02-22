import LoadingWrapper from '@components/Loadings/LoadingWrapper';
import PrivateNavbar from '@components/Navbars/privateNavbar';
import useUsuario from 'hooks/useUsuario';
import Head from 'next/head';
import React, { useEffect } from 'react';

const PrivateLayout = ({ children, title }) => {
  const { usuario, refreshUsuario } = useUsuario();

  useEffect(() => {
    const bucle = setInterval(() => {
      refreshUsuario();
    }, 5000 * 60);
    return () => {
      clearInterval(bucle);
    };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{title || 'MyLittleApp'}</title>
      </Head>
      <LoadingWrapper>
        {usuario && (
          <React.Fragment>
            <PrivateNavbar />
            {children}
          </React.Fragment>
        )}
      </LoadingWrapper>
    </React.Fragment>
  );
};

// const PrivateLayout = whitAuth(Index);

export default PrivateLayout;
