import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authstore";

const Verification = () => {
  // Single state for form data
  const [emailotp, setEmailotp] = useState(""); // Fixed typo from setEmailopt to setEmailotp
  const [phoneotp, setPhoneotp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [error1, setError1] = useState(null);
  const [isemailVerified, setISemailVerified] = useState(false)
  const [isphoneVerified, setISphoneVerified] = useState(false)

  const navigate = useNavigate(); 

 const {verifyEmail,verifyPhone, user} = useAuthStore(); 

 console.log(user)

 

  // Handle input change for email and phone OTP
  const handleEmailOtpChange = (e) => {
    setEmailotp(e.target.value);
  };

  const handlePhoneOtpChange = (e) => {
    setPhoneotp(e.target.value);
  };

  // Handle form submission for email OTP
  const onsubmitemail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError(null); // Reset error state

    try {
      // Make the API call
      const response = await verifyEmail(emailotp, user._id);

      setISemailVerified(true)

      

      // Handle the response from the API
    //   if (response.ok) {
        // const data = await response.json();
        console.log("Email verification successful:", response);
        // navigate("/"); // Navigate to the success page
    //   } else {
    //     setError("Something went wrong with email verification.");
    //   }
    } catch (error) {
      console.log("Error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for phone OTP
  const onsubmitphone = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading1(true);
    setError1(null); // Reset error state

    try {
      // Make the API call
      const response = await verifyPhone(phoneotp, user._id)
      
      setISphoneVerified(true)

      // Handle the response from the API
    //   if (response.ok) {
    //     const data = await response.json();
        console.log("Phone verification successful:", response);
    //     navigate("/verification-success"); // Navigate to success page
    //   } else {
    //     setError("Something went wrong with phone verification.");
    //   }
    } catch (error) {
      console.log("Error:", error);
      setError1("Network error. Please try again.");
    } finally {
      setLoading1(false);
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
          {/* Form for Email OTP verification */}
          <div className="flex flex-col space-y-5 rounded-lg border-[1px] border-gray-300 p-3 w-2/3">
          <div className="text-center">
              <h3 className="font-bold text-2xl">Sign Up</h3>
              <h4>Lorem, ipsum dolor sit amet </h4>
            </div>
            <form onSubmit={onsubmitemail} className=" ">


            {/* Email OTP Input */}
            <div className="bg-gray-100 flex items-center border-[1px] border-gray-300 px-2 rounded-md mb-5">
              <Mail className="h-5 w-5" />
              <input
                type="text"
                name="emailotp"
                placeholder="Email OTP"
                value={emailotp}
                onChange={handleEmailOtpChange}
                className="flex-1 outline-none p-2 bg-transparent rounded-md"
                required
              />
              {isemailVerified && (
                <img src="/check.svg" alt="check" width="25" height="25" />
              )}
            </div>
            {!isemailVerified && (
                 <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md w-full"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
            )}
           

            {error && <div className="text-red-500">{error}</div>}
          </form>
             {/* Form for Phone OTP verification */}
             <form onSubmit={onsubmitphone} className="">
        

            {/* Phone OTP Input */}
            <div className="bg-gray-100 flex items-center border-[1px] border-gray-300 px-2 rounded-md  mb-5">
              <Phone className="h-5 w-5" />
              <input
                type="text"
                name="phoneotp"
                placeholder="Phone OTP"
                value={phoneotp}
                onChange={handlePhoneOtpChange}
                className="flex-1 outline-none p-2 bg-transparent rounded-md"
                required
              />
                {isphoneVerified && (
                <img src="/check.svg" alt="check" width="25" height="25" />
              )}
            </div>

            {!isphoneVerified && (
                 <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md w-full"
              disabled={loading1}
            >
              {loading1 ? "Verifying..." : "Verify phone"}
            </button>
            )}

            {error1 && <div className="text-red-500">{error1}</div>}
          </form>


          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Verification;
