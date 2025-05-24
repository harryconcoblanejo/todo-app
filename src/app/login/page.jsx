import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <section className="container mx-auto p-4 mt-8 max-w-md">
      <LoginForm />
      <p className="text-center mt-4">
        ¿No tienes cuenta?{" "}
        <a
          href="/register"
          className="text-slate-900 font-semibold hover:underline"
        >
          Regístrate aquí
        </a>
      </p>
    </section>
  );
}
