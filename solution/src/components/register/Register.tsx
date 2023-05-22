import { useForm, SubmitHandler } from "react-hook-form";
import { createEmailPasswordUser } from "../../firebase";

type Inputs = {
  mail: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createEmailPasswordUser(
        data.mail,
        data.password,
        `${data.firstName} ${data.lastName}`
      );
    } catch {
      console.log("Could not create email-password user");
    }
  };

  return (
    <div className="relative bottom-28">
      <h2 className="text-2xl font-bold">Register Form</h2>
      <div className="bg-gradient-to-r from-formLeft to-formRight p-4 rounded-md mt-4">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between opacity-100"
        >
          {/* register your input into the hook by invoking the "register" function */}
          <input
            className="rounded-md p-1 mb-2"
            placeholder="Email"
            type="email"
            required={true}
            {...register("mail")}
          />
          {/* include validation with required or other standard HTML validation rules */}
          <input
            className="rounded-md p-1 mb-2"
            placeholder="Password"
            type="password"
            pattern="[0-9a-zA-Z]{8,20}"
            required={true}
            {...register("password")}
          />
          <input
            className="rounded-md p-1 mb-2"
            placeholder="First name"
            type="text"
            pattern="[0-9a-zA-Z]{2,20}"
            required={true}
            {...register("firstName")}
          />
          <input
            className="rounded-md p-1 mb-2"
            placeholder="Last name"
            type="text"
            pattern="[0-9a-zA-Z]{2,20}"
            required={true}
            {...register("lastName")}
          />
          {/* errors will return when field validation fails  */}
          {errors.password && <span>This field is required</span>}
          <input type="submit" value="Register" className="text-white" />
        </form>
      </div>
    </div>
  );
}
