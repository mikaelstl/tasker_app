import type { ApiError } from "@/service/types/response/error";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { SignupForm, type RegisterData } from "@/components/signup-form";
import { LogoIcon } from "@/components/images/logo-icon";
import { toast } from "@/components/shadcn-studio/sonner";

export function Register() {
  const { login } = useAuth();
  const { AccountService, UserService } = useServices();

  const handleRegister = async (data: RegisterData) => {
    try {
      const response = await AccountService.register({
        email: data.email,
        password: data.password
      });

      const account = response.data;

      await UserService.create({
        name: data.name,
        username: data.username,
        accountkey: account.id,
      });

      toast.success("Account created successfully");

      login({
        email: data.email, password: data.password
      });
    } catch (error: any) {
      const { errors } = error as ApiError;

      errors.forEach((err) => {
        toast.warning(err.message);
      });
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/login" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center text-primary-foreground">
            <LogoIcon className="size-6" />
          </div>
          Tasker
        </a>
        <SignupForm
          className="tskr-register-form"
          register={handleRegister}
        />
      </div>
    </div>
  );
}
