"use client";

import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative">
        <div
          onClick={toggleOpen}
          className="
            flex 
            flex-row 
            items-center 
            gap-2
            p-2
            rounded-full 
            cursor-pointer 
            hover:bg-gray-100
            transition-all
            duration-200
            text-gray-600
          "
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-lg shadow-md w-[180px] bg-white overflow-hidden right-0 top-12 text-sm border border-gray-100 z-50">
            {currentUser ? (
              <div>
                <Link href="/contact">
                  <MenuItem onClick={toggleOpen}>Contact Us</MenuItem>
                </Link>
                <Link href="/shipping-policy">
                  <MenuItem onClick={toggleOpen}>Shipping Policy</MenuItem>
                </Link>
                <Link href="/returns">
                  <MenuItem onClick={toggleOpen}>Returns & Exchanges</MenuItem>
                </Link>
                <Link href="/faq">
                  <MenuItem onClick={toggleOpen}>FAQs</MenuItem>
                </Link>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <hr className="border-t border-gray-200" />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/contact">
                  <MenuItem onClick={toggleOpen}>Contact Us</MenuItem>
                </Link>
                <Link href="/shipping-policy">
                  <MenuItem onClick={toggleOpen}>Shipping Policy</MenuItem>
                </Link>
                <Link href="/returns">
                  <MenuItem onClick={toggleOpen}>Returns & Exchanges</MenuItem>
                </Link>
                <Link href="/faq">
                  <MenuItem onClick={toggleOpen}>FAQs</MenuItem>
                </Link>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default UserMenu;
