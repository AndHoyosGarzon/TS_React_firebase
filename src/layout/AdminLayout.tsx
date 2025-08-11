import { Navigate, Outlet } from "react-router"
import { useSigninCheck } from "reactfire"

const AdminLayout = () => {
  
  //hook react-fire trae infromacion importante sobre el acceso de los usuarios a la app
  const{status, data: signIngCheckResult} =useSigninCheck()
  

  //mostrar un loading
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  // redirigir si el usuario no esta autenticado
  if(status === 'success' && !signIngCheckResult.signedIn){
    return <Navigate to='/auth/login' replace/>
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default AdminLayout