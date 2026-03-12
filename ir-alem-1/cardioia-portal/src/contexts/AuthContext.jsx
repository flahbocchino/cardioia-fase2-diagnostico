import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("cardioia_token");
    return token ? { nome: "Dra. Flavia Bocchino", cargo: "Cardiologista" } : null;
  });

  const login = (email, senha) => {
    if (email === "medico@cardioia.com" && senha === "cardioia123") {
      const tokenFake = "jwt_fake_" + Date.now();
      localStorage.setItem("cardioia_token", tokenFake);
      setUser({ nome: "Dra. Flavia Bocchino", cargo: "Cardiologista" });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("cardioia_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
