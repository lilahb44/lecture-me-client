import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const result = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ]);

  return result;
};

export default useQueryParams;
