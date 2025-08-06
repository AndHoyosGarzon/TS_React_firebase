import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";

const RegisterPage = () => {

  //llamamos el auth que lo traer react-fire
  const auth = useAuth()


  // login with credentials google
  const handleClickGoogle = async () => {

    try {
      //utilizamos una nueva instancia del metodo GoogleAuthprovider
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      console.log('User signed in successfully')
    } catch (error) {
      console.log("Error signig in with google: ", error)
    }

  };

  return (
    <div className="flex flex-col gap-20 items-center justify-center h-screen">
      <h1>Register</h1>
      <button 
      onClick={handleClickGoogle}
      className="btn btn-lg bg-red-700/50 hover:bg-red-600/20">
        Sign In Google
      </button>
    </div>
  );
};

export default RegisterPage;
