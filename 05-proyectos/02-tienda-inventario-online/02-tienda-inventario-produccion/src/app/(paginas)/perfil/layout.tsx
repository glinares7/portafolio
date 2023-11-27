"use client";
import { UseContext } from "@/app/contexts/authContext";
import { redirect, useRouter } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    setAuthState,
    testState,
    perfilAuth,
    setPerfilAuth,
    userAuth,
    setUserAuth,
  }: any = useContext(UseContext);

  // const setLogAuth = raiz.setAuthState

  const router = useRouter();

  // console.log('login estado perfil', perfilAuth);

  useLayoutEffect(() => {
    if (!perfilAuth) {
      redirect("/");
    }

    // console.log('dentro del perfil', userAuth);
  }, [perfilAuth]);

  if (!perfilAuth) {
    return null;
  }

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAuthState(false);
    setPerfilAuth(false);
    setUserAuth({});
    router.push("/");

    localStorage.removeItem("token");
  };
  return (
    <>
      {children}
      <br />

      <br />
      <h2>{testState}</h2>
      <button onClick={handleLogout}>logout</button>
    </>
  );
}
