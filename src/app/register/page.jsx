import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="container mx-auto p-4 mt-8 max-w-md">
      <RegisterForm />
      <p className="text-center mt-4">
        ¿Ya tienes cuenta?{" "}
        <a
          href="/login"
          className="text-slate-900 font-semibold hover:underline"
        >
          Inicia sesión aquí
        </a>
      </p>
    </section>
  );
}
