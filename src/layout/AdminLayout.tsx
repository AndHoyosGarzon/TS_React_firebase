import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";

const AdminLayout = () => {
  //hook react-fire trae infromacion importante sobre el acceso de los usuarios a la app
  const { status, data: signIngCheckResult } = useSigninCheck();

  //mostrar un loading
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // redirigir si el usuario no esta autenticado
  if (status === "success" && !signIngCheckResult.signedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Suspense fallback={<div>Loading Data User....</div>}>
      <AuthenticateLayout />
    </Suspense>
  );
};

export default AdminLayout;

//este tipo de componente nos permite hacer una carga asincrona de los datos del usuario desde google y por ende se muestran una vez conicidanS
const AuthenticateLayout = () => {
  useUser({
    suspense: true,
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
};
