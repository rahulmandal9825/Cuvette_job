import { useState } from "react";
import { KeyIcon, Mail, Phone, User, Users } from "lucide-react";
import {  useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authstore";

const Signup = () => {
  // Single state for form data
  const [formData, setFormData] = useState({
    name: "",
    PhoneNum: "",
    ComapanyName: "",
    email: "",
    password:"",
    employeeSize: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const {signup, user} = useAuthStore();

  console.log(user);

  


  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const onsubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError(null); // Reset error state

    try {
      // Make the API call
      await signup(formData)

 


    
        console.log("Signup successful:");
        navigate("/verification");
      //   // Optionally, redirect or display success message
      // } else {
       
      //   setError( "Something went wrong");
      // }
    } catch (error) {
      console.log("Error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="m-20 w-full flex">
        <div className="flex-1 flex flex-col justify-center pr-10">
          <h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe non
            alias illo. Sunt, nihil eius exercitationem quos ipsa ducimus
            magnam iusto harum autem accusantium voluptate nam optio fuga eum
            soluta!
          </h1>
        </div>
        <div className="flex-1 items-center flex justify-center">
          <form
            onSubmit={onsubmit}
            className="flex flex-col space-y-5 rounded-lg border-[1px] border-gray-300 p-3 w-2/3"
          >
            <div className="text-center">
              <h3 className="font-bold text-2xl">Sign Up</h3>
              <h4>Lorem, ipsum dolor sit amet </h4>
            </div>

            {/* Name Input */}
            <div className="bg-gray-100 flex items-center border-[1px] border-gray-300 px-2 rounded-md">
              <User className="h-5 w-5" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 outline-none p-2 bg-transparent rounded-md"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="bg-gray-100 flex items-center border-[1px] border-gray-300 px-2 rounded-md">
              <Phone className="h-5 w-5" />
              <input
                type="tel"
                name="PhoneNum"
                placeholder="Phone no."
                value={formData.phoneNum}
                onChange={handleChange}
                className="flex-1 outline-none p-2 bg-transparent rounded-md"
                required
              />
            </div>

            {/* Company Name Input */}
            <div className="bg-gray-100 flex items-center border-[1px] border-gray-300 px-2 rounded-md">
              <User className="h-5 w-5" />
              <input
                type="text"
                name="ComapanyName"
                placeholder="Company Name"
                value={formData.ComapanyName}
                onChange={handleChange}
                className="flex-1 outline-none p-2 bg-transparent rounded-md"
                required
              />
            </div>

            {/* Email Input */}
            <div className="bg-gray-100 flex items-center border-[1px] border-gray-300 px-2 rounded-md">
              <Mail className="h-5 w-5" />
              <input
                type="email"
                name="email"
                placeholder="Company Email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 outline-none p-2 bg-transparent rounded-md"
                required
              />
            </div>
             {/* password Input */}
             <div className="bg-gray-100 flex items-center border-[1px] border-gray-300 px-2 rounded-md">
              <KeyIcon className="h-5 w-5" />
              <input
                type="password"
                name="password"
                placeholder="new password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 outline-none p-2 bg-transparent rounded-md"
                required
              />
            </div>


            {/* Employee Size Input */}
            <div className="bg-gray-100 flex items-center border-[1px] border-gray-300 px-2 rounded-md">
              <Users className="h-5 w-5" />
              <input
                type="number"
                name="employeeSize"
                placeholder="Employee Size"
                value={formData.employeeSize}
                onChange={handleChange}
                className="flex-1 outline-none p-2 bg-transparent rounded-md"
                required
              />
            </div>

            <div className="flex w-full justify-center">
              <span className="text-xs w-2/3 text-center">
                By Clicking on proceed you will accept our{" "}
                <span className="text-blue-700 font-semibold cursor-pointer">
                  Terms
                </span>{" "}
                &{" "}
                <span className="cursor-pointer text-blue-700 font-semibold">
                  Conditions
                </span>
              </span>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white p-1 rounded-md"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed"}
            </button>

            {error && <div className="text-red-500">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
