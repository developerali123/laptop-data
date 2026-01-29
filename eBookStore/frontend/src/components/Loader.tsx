import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = "md", fullScreen = false }) => {
  // Size configurations
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  // Container classes
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50"
    : "flex items-center justify-center py-8";

  return (
    <div className={containerClasses}>
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className={sizeClasses[size]}
      >
        <BookOpen className="w-full h-full text-blue-600" />
      </motion.div>
    </div>
  );
};

export default Loader;
