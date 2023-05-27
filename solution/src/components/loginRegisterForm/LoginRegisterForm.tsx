import { useForm, SubmitHandler } from "react-hook-form";
import { createEmailPasswordUser, signInUser } from "../../firebase";
import { useDisplayNameDispatch } from "../../contexts/userDisplayName/userDisplayNameContext";

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (loginForm) {
        // Login existing user
        await signInUser("emailpassword", data.mail, data.password);
      } else {
        // Create new user and update the display name locally (client side)
        const fullName = `${data.firstName} ${data.lastName}`;
        await createEmailPasswordUser(data.mail, data.password, fullName);
        // Todo: Default of the dispatch is null which might be unnecessary
        if (userDisplayNameDispatch) {
          userDisplayNameDispatch({
            type: "set-name",
            userDisplayName: fullName,
          });
        }
      }
    } catch {
      console.log("Could not sign in email-password user");
    }
  };

  return (
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
    </div>
  );
}
