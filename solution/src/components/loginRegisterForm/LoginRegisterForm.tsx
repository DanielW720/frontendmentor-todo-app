import { useForm, SubmitHandler } from "react-hook-form";
import { auth, createEmailPasswordUser, signInUser } from "../../firebase";
import { useDisplayNameDispatch } from "../../contexts/userDisplayName/userDisplayNameContext";
import { useState } from "react";
import { ErrorModal } from "./ErrorModal";

type Inputs = {
  mail: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function LoginRegisterForm({
  loginForm,
}: {
  loginForm: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const userDisplayNameDispatch = useDisplayNameDispatch();
  const [errorModal, setErrorModal] = useState({
    show: false,
    errorMessageMarkup: <div></div>,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Todo: Default of the dispatch is null which might be unnecessary
    if (!userDisplayNameDispatch) return;
    try {
      if (loginForm) {
        // Login existing user
        await signInUser("emailpassword", data.mail, data.password);
        var currentUserDisplayName = auth.currentUser?.displayName;
        userDisplayNameDispatch({
          type: "set-name",
          userDisplayName: currentUserDisplayName ? currentUserDisplayName : "",
        });
      } else {
        const fullName = `${data.firstName} ${data.lastName}`;
        // Create new user
        await createEmailPasswordUser(data.mail, data.password, fullName);
        // Update the display name locally (client side)
        userDisplayNameDispatch({
          type: "set-name",
          userDisplayName: fullName,
        });
      }
    } catch (e) {
      console.error("Could not sign in email-password user", e);
      if (e === "CreateEmailPasswordUserError") {
        setErrorModal({
          show: true,
          errorMessageMarkup: (
            <div>
              <p className="font-bold text-xl text-headerRight">
                Register failure
              </p>
              <p>Did you already create an account?</p>
            </div>
          ),
        });
      } else if (e === "SignInEmailPasswordUserError") {
        setErrorModal({
          show: true,
          errorMessageMarkup: (
            <div>
              <p className="font-bold text-xl text-headerRight">
                Login failure
              </p>
              <p>Have you created an account yet?</p>
            </div>
          ),
        });
      }
    }
  };

  const handleCloseModal = () => {
    setErrorModal({ show: false, errorMessageMarkup: <div></div> });
  };

  return (
    <div>
      <div
        className={`bg-gradient-to-r from-formLeft to-formRight rounded-md mt-4`}
      >
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between p-2"
        >
          {/* register your input into the hook by invoking the "register" function */}
          <input
            className="rounded-md m-1 px-2 py-1 text-brightBlue"
            placeholder="Email"
            type="email"
            required={true}
            pattern="[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+"
            {...register("mail")}
          />
          {/* include validation with required or other standard HTML validation rules */}
          <input
            className="rounded-md m-1 px-2 py-1 text-brightBlue"
            placeholder="Password"
            type="password"
            pattern="[0-9a-zA-Z]{8,20}"
            required={true}
            {...register("password")}
          />
          {/* When registring a new user, also request first and last name */}
          {!loginForm && (
            <input
              className="rounded-md m-1 px-2 py-1 text-brightBlue"
              placeholder="First name"
              type="text"
              pattern="[0-9a-zA-Z]{2,20}"
              required={true}
              {...register("firstName")}
            />
          )}
          {!loginForm && (
            <input
              className="rounded-md m-1 px-2 py-1 text-brightBlue"
              placeholder="Last name"
              type="text"
              pattern="[0-9a-zA-Z]{2,20}"
              required={true}
              {...register("lastName")}
            />
          )}
          {/* errors will return when field validation fails  */}
          {errors.password && <span>This field is required</span>}
          <input
            type="submit"
            value={loginForm ? "Login" : "Register"}
            className={`dark:text-white text-veryDarkDesaturatedBlue font-bold cursor-pointer w-fit self-center my-3 p-1 rounded-md border-[1px] dark:border-white border-veryDarkDesaturatedBlue transition-all duration-500`}
          />
        </form>
        {errorModal.show && (
          <ErrorModal
            modalIsOpen={errorModal.show}
            errorMessage={errorModal.errorMessageMarkup}
            handleCloseModal={handleCloseModal}
          ></ErrorModal>
        )}
      </div>
    </div>
  );
}
