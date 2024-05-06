"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { getPriceInCOP } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ManagerPage = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.rol !== "Encargado") {
      router.push("/");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <main className="mx-auto flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8 lg:py-20">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl self-start mb-9">
        Encargado
      </h1>
      <section className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Orden id
              </th>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                1
              </th>
              <td className="px-6 py-4">Nicolas Londono</td>
              <td className="px-6 py-4">2024-05-01</td>
              <td className="px-6 py-4">{getPriceInCOP(120000)}</td>
              <td className="px-6 py-4">
                <Link
                  href="/backoffice/order/1"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Editar
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ManagerPage;