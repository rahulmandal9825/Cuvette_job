import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authstore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const {user , logout} = useAuthStore();

  const signout = async ()=>{
    try {
      await logout()
      navigate("/login")

    } catch (error) {
      console.log(error,"logout something went wrong ")
    }
  }


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex border-b-[1px] w-full border-gray-300 fixed top-0 justify-between bg-white text-black'>
      <Link to="/">
        <img src="/logo.jpg" alt="logo" width="150" height="130" />
      </Link>
      <div className="flex h-[40px] self-center gap-3 pr-10">
        <h1 className="text-xl self-center">Contact</h1>
        <div className="relative flex items-center p-2 border-[2px] border-gray-300 rounded-lg">
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md border-none bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm "
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              {user.name}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                    <button onClick={signout} className="block w-full px-4 py-2 text-left bg-white text-sm text-gray-700" role="menuitem">
                      Sign out
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
