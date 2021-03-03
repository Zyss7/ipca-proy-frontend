import { URL_API_MN } from '@services/urls';
import Axios from 'axios';
import { useMemo } from 'react';
import { useToasts } from 'react-toast-notifications';
import useCustomRouter from './useCustomRouter';

const useAxios = (baseURL = URL_API_MN) => {
  const usuario = useMemo(() => JSON.parse(localStorage.getItem('usuarioMLN')) || {}, []);
  const router = useCustomRouter();
  const { addToast } = useToasts();

  const privateAxios = useMemo(() => {
    console.log(usuario.persona);
    const instance = Axios.create({
      baseURL,
      headers: { Authorization: usuario?.persona?.identificacion || null },
      validateStatus: (status) => true,
    });

    instance.interceptors.response.use((response) => {
      if (response.status === 401) {
        router.push('/login');
        localStorage.removeItem('usuarioMLN');
        addToast(response?.data?.error?.mensaje, {
          appearance: 'warning',
        });
      }
      response.status = 200;
      return response;
    });

    return instance;
  }, [baseURL, usuario]);

  const publicAxios = useMemo(() => {
    const instance = Axios.create({ baseURL });

    return instance;
  }, [baseURL]);

  return { privateAxios, publicAxios };
};

export default useAxios;
