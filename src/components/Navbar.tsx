"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import {
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  PencilIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUser(true);
    }
  }, []);

  // State to manage dropdown menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle dropdown menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const router = useRouter();

  const signOut = () => {
    Cookies.remove("token");
    Cookies.remove("uuid");
    Cookies.remove("dias");
    Cookies.remove("EtabId");
    Cookies.remove("user");

    window.location.reload();
  };

  return (
    <nav className="bg-green-600 text-white py-4 px-4 md:px-12 flex items-center justify-between relative z-50">
      <div className="flex items-center flex-shrink-0">
        <Link href="/">
          <Image
            src="/nav.png" // Replace with your actual logo path
            alt="Logo"
            width={120}
            height={80}
          />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="p-2 focus:outline-none"
          onClick={toggleMenu} // Toggle menu visibility on click
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-green-600 shadow-lg z-50">
          <div className="flex flex-col space-y-2 p-4">
            {user && (
              <>
                <Link
                  href="/profile"
                  className={`flex relative items-center justify-center  px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                    pathname === "/profile"
                      ? "bg-white text-green-600"
                      : "hover:bg-white hover:text-green-600"
                  }`}
                  onClick={closeMenu} // Close menu on link click
                >
                  <UserIcon className="h-6 w-6 absolute left-0 m-3" />
                  Profile
                </Link>

                <Link
                  href="/group" // Adjust the href for your Group page
                  className={`flex relative items-center justify-center px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                    pathname === "/group"
                      ? "bg-white text-green-600"
                      : "hover:bg-white hover:text-green-600"
                  }`}
                  onClick={closeMenu} // Close menu on link click
                >
                  <UserGroupIcon className="h-6 w-6 absolute left-0 m-3" />
                  Group
                </Link>
                <Link
                  href="/notes"
                  className={`flex relative items-center justify-center px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                    pathname === "/notes"
                      ? "bg-white text-green-600"
                      : "hover:bg-white hover:text-green-600"
                  }`}
                  onClick={closeMenu} // Close menu on link click
                >
                  <PencilIcon className="h-6 w-6 absolute left-0 m-3" />
                  Notes
                </Link>
                <Link
                  href="/exams"
                  className={`flex relative items-center justify-center px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                    pathname === "/exams"
                      ? "bg-white text-green-600"
                      : "hover:bg-white hover:text-green-600"
                  }`}
                  onClick={closeMenu} // Close menu on link click
                >
                  <PencilIcon className="h-6 w-6 absolute left-0 m-3" />
                  Exams
                </Link>

                <button
                  className="flex relative items-center justify-center hover:bg-white hover:text-red-600 px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300"
                  onClick={() => {
                    signOut();
                    closeMenu(); // Close menu after sign out
                  }}
                >
                  <ArrowLeftStartOnRectangleIcon className="h-6 w-6 absolute left-0 m-3" />
                  Log Out
                </button>
              </>
            )}

            {/* {!user && (
              <Link
                href="/"
                className={`text-white hover:bg-white hover:text-green-600 px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                  pathname === "/" ? "hidden" : ""
                }`}
                onClick={closeMenu} // Close menu on link click
              >
                <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
                Sign In
              </Link>
            )} */}
          </div>
        </div>
      )}

      {/* Desktop Menu */}

      {/* {!user && pathname !== "/" && (
        <Link
          href="/"
          className="hidden md:flex gap-2 text-white hover:bg-white hover:text-green-600 px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300"
        >
          <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
          Sign In
        </Link>
      )} */}

      {user && (
        <>
          <div className="md:flex gap-2 hidden">
            <Link
              href="/profile"
              className={`flex gap-2 px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 ${
                pathname === "/profile"
                  ? "bg-white text-green-600"
                  : "hover:bg-white hover:text-green-600"
              }`}
            >
              <UserIcon className="h-6 w-6" />
              Profile
            </Link>

            <Link
              href="/group"
              className={`flex gap-2 px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                pathname === "/group"
                  ? "bg-white text-green-600 scale-105"
                  : "hover:bg-white hover:text-green-600"
              }`}
            >
              <UserGroupIcon className="h-6 w-6" />
              Group
            </Link>
            <Link
              href="/notes"
              className={`flex gap-2 items-center px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                pathname === "/notes"
                  ? "bg-white text-green-600 scale-105"
                  : "hover:bg-white hover:text-green-600"
              }`}
            >
              <PencilIcon className="h-6 w-6" />
              Notes
            </Link>
            <Link
              href="/exams"
              className={`flex gap-2 items-center px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                pathname === "/exams"
                  ? "bg-white text-green-600 scale-105"
                  : "hover:bg-white hover:text-green-600"
              }`}
            >
              <ExclamationTriangleIcon className="h-6 w-6" />
              Exams
            </Link>
          </div>

          <button
            className="hidden md:flex gap-2 items-center text-white hover:bg-white hover:text-red-600 px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300"
            onClick={() => signOut()}
          >
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
            Log Out
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
