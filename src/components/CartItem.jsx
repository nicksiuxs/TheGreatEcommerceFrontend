import { useAppDispatch } from "@/redux/hooks/hooks";
import Modal from "react-modal";
import {
  removeFromCart,
  modifyItemQuantity,
  changeItemQuantity,
  onBlurQuantity,
} from "@/redux/slice/cartSlice";
import { getPriceInCOP } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const CartItem = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const removeItemFromCart = () => {
    dispatch(removeFromCart(item.idArticulo));
  };

  const handleItemQuantity = (event) => {
    const name = event.target.name;
    dispatch(modifyItemQuantity({ name, id: item.idArticulo }));
  };

  const onChangeInput = (event) => {
    const value = parseInt(event.target.value);
    dispatch(changeItemQuantity({ value, id: item.idArticulo }));
  };

  const onBlurInput = (event) => {
    const value = parseInt(event.target.value);
    dispatch(onBlurQuantity({ value, id: item.idArticulo }));
  };

  return (
    <>
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={item.imagen}
          width={500}
          height={500}
          alt="Picture of the author"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={"/item/" + item.idArticulo}>{item.nombre}</Link>
            </h3>
            <p className="ml-4">{getPriceInCOP(item.precio)}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="text-gray-500">
            <div>Cantidad:</div>
            <div className="flex justify-between">
              <button
                name="delete"
                className="rounded-md bg-indigo-600 font-semibold text-white px-3 py-1"
                onClick={handleItemQuantity}
              >
                -
              </button>
              <input
                className="rounded-md w-20 text-center mx-1"
                type="number"
                onChange={onChangeInput}
                onBlur={onBlurInput}
                value={item.cantidadComprar}
                min={0}
                max={item.cantidad}
              />
              {/* <div className="px-2 py-1">{item.cantidadComprar}</div> */}
              <button
                name="add"
                className="rounded-md bg-indigo-600 font-semibold text-white px-3 py-1"
                onClick={handleItemQuantity}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex">
            {item.esPersonalizable ? (
              <div>
                <button
                  className="font-medium text-indigo-600 mr-5"
                  onClick={() => setOpenModal(true)}
                >
                  Ver comentarios
                </button>
                <Modal
                  isOpen={openModal}
                  onRequestClose={() => setOpenModal(false)}
                  style={{
                    content: {
                      top: "50%",
                      left: "50%",
                      right: "auto",
                      bottom: "auto",
                      marginRight: "-50%",
                      transform: "translate(-50%, -50%)",
                    },
                  }}
                >
                  <div className="w-full min-h-16">
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-bold">Comentarios</h2>
                      <button onClick={() => setOpenModal(false)}>
                        Cerrar
                      </button>
                    </div>
                    <div className="mt-2">
                      <div className="w-96">{item.comentario}</div>
                    </div>
                  </div>
                </Modal>
              </div>
            ) : null}

            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={removeItemFromCart}
            >
              Quitar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
