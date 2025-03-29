import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { loginRequest } from "../services/authService"; 
import { useForm } from "react-hook-form"; // Importamos useForm

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm(); // RHF hooks
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(null);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const onSubmit = async (data) => {
    if (!captchaToken) {
      setError("Por favor, completa el CAPTCHA");
      return;
    }

    try {
      const { token, role } = await loginRequest(data.email, data.password, captchaToken);
      login(token, role, navigate);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Campo de Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Por favor, ingresa un correo válido",
            },
          })}
          className="w-full p-2 border rounded mb-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Campo de Contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: "La contraseña es obligatoria" })}
          className="w-full p-2 border rounded mb-2"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {/* ReCAPTCHA */}
        <ReCAPTCHA sitekey={siteKey} onChange={setCaptchaToken} />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-2 rounded">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
