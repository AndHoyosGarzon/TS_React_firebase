import { useAuthActions } from "../../hooks/use-auth-actions"

const Loginpage = () => {


  //import hooks 
  const {loginWithGoole} = useAuthActions()

  return (
    <div>Loginpage</div>
  )
}

export default Loginpage