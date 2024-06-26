"use client";
import Input from "@/components/Input";
import useForm from "@/customHooks/useForm";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { login } from "@/redux/slice/userSlice";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { redirectUserTo } from "@/utils/utils";
import toast from "react-hot-toast";

const Login = () => {
  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOnSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:8080/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email, contrasenia: password }),
      });

      // Verificar el estado de la respuesta
      if (response.ok && response.status === 200) {
        const user = await response.json();
        if (user && user !== null) {
          await dispatch(login(user));
          router.push(redirectUserTo(user.rol));
        } else {
          throw new Error("El usuario no existe");
        }
      } else {
        throw new Error("Problemas para iniciar sesión");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Ingresa en tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleOnSubmit}
        >
          <div>
            <Input
              label={"Correo electrónico"}
              name="email"
              type={"email"}
              value={email}
              onChange={onInputChange}
              isRequired={true}
            />
          </div>

          <div>
            <div className="mt-2">
              <Input
                label={"Contraseña"}
                name="password"
                type={"password"}
                value={password}
                onChange={onInputChange}
                isRequired={true}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          <Link
            href="/backoffice/create-account"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
