import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./apis/api";
import "./App.css";
import {
  selectToken,
  selectUserId,
  storeToken,
  storeUserId,
} from "./AuthSlice";
import InputField from "./components/InputField";
import Toast from "./components/Toast";
import { notify } from "./constants/constant";

type Errors = {
  email_address?: string;
  password?: string;
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const [email_address, setemail_address] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);

  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const [isPaymentPageVisible, setIsPaymentPageVisible] = React.useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = React.useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = React.useState(false);

  useEffect(() => {
    if (userId) {
      navigate("/dashboard");
      return;
    }
  }, [userId, navigate]);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error" as "success" | "error",
  });
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors: Errors = {};
    const email_addressPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[com]{3}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!email_address) {
      newErrors.email_address = "Email is required.";
    } else if (!email_addressPattern.test(email_address)) {
      newErrors.email_address = "Invalid email format.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passwordPattern.test(password)) {
      newErrors.password = "Password must be valid & at least 6 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await login({ email_address, password }).unwrap();

        if (response?.token && response?.employee?.id) {
          dispatch(storeToken(response.token));
          dispatch(storeUserId(response.employee.id));

          notify("Login successful!", "success");
          navigate("/dashboard");
        }
      } catch (error: any) {
        notify(error?.data?.message || "Login failed.", "error");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-2">
          <img
            src="/images/logo.png"
            alt="logo_img"
            className="rounded-full w-52 h-28 object-contain mx-auto" // Preserve aspect ratio without stretching
          />
        </div>

        <div>
          <h2
            className="text-xl font-500 text-center mb-6"
            style={{ fontFamily: "Manrope" }}
          >
            Sign In Your Account
          </h2>
        </div>

        <InputField
          name="email_address"
          label="Email Address"
          type="email"
          value={email_address}
          onChange={(e) => setemail_address(e.target.value)}
          placeholder="Enter your email"
          required
          error={errors.email_address}
        />

        <div className="mb-4 relative">
          <InputField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            error={errors.password}
          />
          <button
            type="button"
            className="absolute top-6 right-3 flex items-center p-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
            type="submit"
          >
            Log in
          </button>
        </div>

        <Toast
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={closeToast}
        />
      </form>
    </div>
  );
};

export default App;
