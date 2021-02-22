import { registerSw } from '@services/registerSw';
import { toB64 } from '@utils/base64';
import { useState } from 'react';
import useAxios from './useAxios';

const useUsuario = () => {
  const usuKey = 'usuarioMLN';
  const { publicAxios, privateAxios } = useAxios();

  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem(usuKey) || null),
  );

  const removeUsuario = () => {
    localStorage.removeItem(usuKey);
  };

  const getDataPushNotifications = async () => {
    const sw = await registerSw();
    return {
      endpoint: sw?.subscription?.endpoint,
      browser: sw.browser,
      auth: sw.subscription.keys.auth,
      p256dh: sw.subscription.keys.p256dh,
    };
  };

  /**
   *
   * @param {{username:string, password:string}} data
   */
  const login = async ({ username, password }) => {
    const res = await publicAxios.post(
      'login',
      {
        username,
        password: toB64(password),
        ...(await getDataPushNotifications()),
      },
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );

    if (res.status === 200 && res?.data?.transaccion === true) {
      localStorage.setItem(usuKey, JSON.stringify(res?.data?.data));
    }

    return res.data;
  };

  const logout = async () => {
    await privateAxios.post(
      'logout',
      {
        // username: usuario.username,
        username: usuario?.persona?.usuario?.username,
        pushInfo: await getDataPushNotifications(),
      },
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );
    removeUsuario();
  };

  const refreshUsuario = async () => {
    const { data } = await privateAxios.post('get-info-usuario');
    setUsuario(data?.data);
    return data?.data;
  };

  return { login, logout, usuario, refreshUsuario };
};

export default useUsuario;
