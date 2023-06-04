import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "../modal/Modal";
import googleLogo from "../../assets/images/google-logo.svg";
import {
  auth,
  deleteUserFromAuthAndFirestore,
  reauthenticateUser,
} from "../../firebase";
import { useState } from "react";

type Inputs = {
  mail: string;
  password: string;
};

export const Unregister = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { register, handleSubmit } = useForm<Inputs>();
  // If user authenticated with password, show login form. Else, show Google reauth button.
  const isAuthUsingPassword =
    auth.currentUser!.providerData[0].providerId === "password";
  const [showReauthErrorModal, setShowReauthErrorModal] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await reauthenticateUser("password", data.mail, data.password);
      await deleteUserFromAuthAndFirestore();
      handleCloseModal();
    } catch (e) {
      if (e === "ReauthenticateWithPasswordError") {
        toggleShowReauthErrorModal();
      }
    }
  };

  const reauthenticateWithGoogle = async () => {
    try {
      await reauthenticateUser("google");
      await deleteUserFromAuthAndFirestore();
      handleCloseModal();
    } catch (e) {
      if (e === "ReauthenticateWithPasswordError") {
        toggleShowReauthErrorModal();
      }
    }
  };

  const toggleShowReauthErrorModal = () => {
    setShowReauthErrorModal((prevState) => !prevState);
  };

  if (showReauthErrorModal) {
    return (
      <Modal handleCloseModal={toggleShowReauthErrorModal}>
        <div>
          <p className="text-xl font-bold text-brightBlue">
            Reauthentication failure
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal handleCloseModal={handleCloseModal}>
      {isAuthUsingPassword ? (
        <div>
          <div>Reauthenticate to unregister</div>
          <div>
            <form
              className="flex flex-col justify-between p-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="m-1 rounded-md px-2 py-1 text-brightBlue"
                placeholder="Email"
                type="email"
                required={true}
                pattern="[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+"
                {...register("mail")}
              />
              <input
                className="mx-1 mt-1 rounded-md px-2 py-1 text-brightBlue"
                placeholder="Password"
                type="password"
                pattern="[0-9a-zA-Z]{8,20}"
                required={true}
                {...register("password")}
              />
              <input
                type="submit"
                value="Reauthenticate"
                className={`my-3 w-fit cursor-pointer self-center rounded-md border-[1px] border-veryDarkDesaturatedBlue p-1 font-bold text-veryDarkDesaturatedBlue transition-all duration-500 dark:border-white dark:text-white`}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p>In order to unregister you need to reauthenticate.</p>
          <div className="my-4 flex w-fit items-center justify-around rounded-lg bg-veryDarkDesaturatedBlue p-2 shadow-md-symmetric shadow-headerLeft transition-all duration-500 ">
            <img src={googleLogo} alt="Google logo" width="20px" />
            <button
              className="ml-2 text-white"
              onClick={reauthenticateWithGoogle}
            >
              Reauthenticate
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
