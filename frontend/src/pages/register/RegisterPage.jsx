import { motion } from "framer-motion";
import RegisterForm from "../../components/features/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-6">
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <RegisterForm />
      </motion.div>
    </div>
  );
}
