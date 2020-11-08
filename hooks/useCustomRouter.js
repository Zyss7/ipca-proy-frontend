import { useRouter } from "next/router";

const useCustomRouter = () => {
  const router = useRouter();

  const goTo = (path = "/") => () => {
    router.push(path);
  };

  return { ...router, goTo };
};

export default useCustomRouter;
