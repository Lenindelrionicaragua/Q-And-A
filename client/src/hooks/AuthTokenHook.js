import { useAuth } from "../Context/AuthContext";
import { logInfo } from "../../../server/src/util/logging";

const useAuthToken = () => {
  const { token } = useAuth();
  logInfo(`Token set in AuthTokenHook: ${token}`);
  return token;
};

export default useAuthToken;
