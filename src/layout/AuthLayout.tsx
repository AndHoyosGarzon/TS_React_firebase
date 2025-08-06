import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
  
  
  //hook react-fire trae infromacion importante sobre el acceso de los usuarios a la app
  const{status, data: signIngCheckResult, hassEmitted } =useSigninCheck()
  
  
  
  //mostrar un loading
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  
  // redirigir si el usuario no esta autenticado
  if(status === 'success' && signIngCheckResult.signedIn){
    console.log(signIngCheckResult.signedIn)
    return <Navigate to='/admin' replace/>
  }


  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
