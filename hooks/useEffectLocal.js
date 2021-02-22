import { useEffect } from 'react';

const useEffectLocal = (effect, dependencies) => {
  useEffect(() => {
    if (window !== undefined) {
      effect();
    }
  }, dependencies);
};

export default useEffectLocal;
