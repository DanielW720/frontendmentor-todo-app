import { useForm, SubmitHandler } from "react-hook-form";
import { signInUser } from "../../firebase";

type Inputs = {
  mail: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signInUser("emailpassword", data.mail, data.password);
    } catch {
      console.log("Could not sign in email-password user");
    }
  };

  return (
    <div className="relative bottom-32">
      <h2 className="text-2xl font-bold">Login</h2>
      <div className="bg-gradient-to-r from-formLeft to-formRight rounded-md mt-4">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between opacity-100 p-2"
        >
          {/* register your input into the hook by invoking the "register" function */}
          <input
            className="rounded-md  m-1 p-1"
            placeholder="Email"
            type="email"
            required={true}
            {...register("mail")}
          />
          {/* include validation with required or other standard HTML validation rules */}
          <input
            className="rounded-md m-1 p-1"
            placeholder="Password"
            type="password"
            pattern="[0-9a-zA-Z]{8,20}"
            required={true}
            {...register("password")}
          />
          {/* errors will return when field validation fails  */}
          {errors.password && <span>This field is required</span>}
          <input type="submit" value="Login" className="text-white" />
        </form>
      </div>
    </div>
  );
}
