import useAxios from './useAxios';

export const useSpeak = () => {
  const { privateAxios } = useAxios();

  const fetchAudio = async (text) => {
    const res = await privateAxios.post(
      '/text-to-speach',
      { text },
      { responseType: 'blob' },
    );
    return res?.data;
  };

  return { fetchAudio };
};
