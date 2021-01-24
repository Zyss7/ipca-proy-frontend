import { URL_API_MN } from "@services/urls";
import Axios from "axios";
import { useMemo } from "react";

const useAxios = (baseURL = URL_API_MN) => {
  const axios = useMemo(() => Axios.create({ baseURL }), [baseURL]);
  return { axios };
};

export default useAxios;
