/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Form/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PurchaseModal = ({ closeModal, isOpen, plant, refetch }) => {
  const { user } = useAuth();
  const { category, price, name, quantity, seller, _id } = plant;
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [purchaseInfo, setPurchaseInfo] = useState({
    customer: {},
    plantId: _id,
    price: totalPrice,
    quantity: totalQuantity,
    seller: seller?.email,
    address: "",
    status: "Pending",
  });

  useEffect(() => {
    if (user) {
      setPurchaseInfo((prev) => ({
        ...prev,
        customer: {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        },
      }));
    }
  }, [user]);

  const handleQuantity = (value) => {
    const quantityValue = parseInt(value);
    if (quantityValue < 0) {
      setTotalQuantity(1);
      setTotalPrice(1 * price);
      setPurchaseInfo((prev) => {
        return { ...prev, quantity: 1, price: price };
      });
      return toast.error("Quantity cannot be less than 1");
    }

    if (quantityValue > quantity) {
      setTotalQuantity(quantity);
      setTotalPrice(quantity * price);
      setPurchaseInfo((prev) => {
        return { ...prev, quantity: quantity, price: quantity * price };
      });
      return toast.error("Quantity exceeds available stock!");
    }

    setTotalQuantity(quantityValue);
    setTotalPrice(quantityValue * price);
    setPurchaseInfo((prev) => {
      return { ...prev, quantity: quantityValue, price: quantityValue * price };
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Plant: {name}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Category: {category}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Customer: {user?.displayName}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">Price: ${price}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Available Quantity: {quantity}
                  </p>
                </div>
                {/* Quantity input field */}
                <div className="space-x-2 mt-1 text-sm">
                  <label htmlFor="quantity" className="text-gray-600">
                    Quantity:
                  </label>
                  <input
                    className="p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="quantity"
                    id="quantity"
                    type="number"
                    value={totalQuantity}
                    onChange={(e) => handleQuantity(e.target.value)}
                    placeholder="Available quantity"
                    required
                  />
                </div>
                {/* Address input field */}
                <div className="space-x-2 text-sm mt-1">
                  <label htmlFor="name" className="text-gray-600">
                    Address:
                  </label>
                  <input
                    className="p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                    name="address"
                    id="address"
                    type="text"
                    onChange={(e) =>
                      setPurchaseInfo((prev) => {
                        return { ...prev, address: e.target.value };
                      })
                    }
                    placeholder="Shipping Address.."
                    required
                  />
                </div>

                {/* CheckOutForm */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    closeModal={closeModal}
                    purchaseInfo={purchaseInfo}
                    refetch={refetch}
                    totalQuantity={totalQuantity}
                  />
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
