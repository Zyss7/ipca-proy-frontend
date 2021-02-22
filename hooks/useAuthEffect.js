import { useEffect } from 'react';
import useCustomRouter from './useCustomRouter';
import useUsuario from './useUsuario';

const useAuthEffect = (effect, dependencies) => {
  const { usuario } = useUsuario();

  const router = useCustomRouter();

  useEffect(() => {
    if (usuario) {
      effect();
    } else {
      router.push('/login');
    }
    return () => {};
  }, dependencies);
};

export default useAuthEffect;
