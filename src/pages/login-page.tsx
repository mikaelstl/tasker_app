import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/images/logo";
import { LogoIcon } from "@/components/images/logo-icon";
import type { LoginDTO } from "@/service/types/auth/login.dto";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/shadcn-studio/sonner";

export function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (data: LoginDTO) => {
    try {
      await login(data);

      console.log("login success");

      navigate('/workspaces');
      toast.success("Login efectued with success.")
    } catch (err) {
      console.error(err);
    }
  }

  const toRegister = () => {
    navigate('/register');
  }

  return (
    <div className="tskr-login-page-content grid min-h-svh lg:grid-cols-2">
      <div className="tskr-login-page-logo h-full flex flex-col items-center justify-center relative">
        <Logo />
      </div>
      <div className="tskr-login-form-container flex flex-col gap-4 p-6 md:p-10 bg-background">
        <div className="tskr-login-page-icon flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <LogoIcon className="size-6" />
            Tasker
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm login={handleLogin} register={toRegister}/>
          </div>
        </div>
      </div>
    </div>
  )
}
