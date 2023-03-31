import React from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { selectItems } from '../slices/basketSlice';


import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import nextAuth from 'next-auth';
import { useSelector } from 'react-redux';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <header>
        {/* Top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
            <Image
                onClick={() => router.push('/')} 
                src='https://links.papareact.com/f90'
                width={150}
                height={40}
                objectfit="contain"
                className="cursor-pointer mx-5"
            />
        </div>
        {/* SearchBox */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
           <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
           <SearchIcon className="h-12 p-4"/>
        </div>
        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespcae-nowrap">
            <div onClick={!session ? signIn : signOut} className="cursor-pointer link">
                <p className="hover:underline">
                  {session ? `hello, ${session.user.name}` : "signIn"}
                </p>
                <p className="font-extrabold md:text-sm">Accounts & lists</p>
            </div>
            <div className="link">
                <p>Returns</p>
                <p className="font-extrabold md:text-sm">& Orders</p>
            </div>
            <div onClick={() => router.push('/checkout')} className="relative link flex items-center">
                <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                  {items.length}
                </span>
                <ShoppingCartIcon className="h-10" />
                <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
            </div>
        </div>
     </div>
        {/* Bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
              <p className="flex link items-center">
            <MenuIcon className="h-6 mr-1"/>
            All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Buisness</p>
        <p className="link">Today's Deals</p>
        <p className="hidden lg:inline-flex link">Electronics</p>
        <p className="hidden lg:inline-flex link">Food & Grocery</p>
        <p className="hidden lg:inline-flex link">Prime</p>
        <p className="hidden lg:inline-flex link">Buy Again</p>
        <p className="hidden lg:inline-flex link">Shopper Toolkit</p>
        <p className="hidden lg:inline-flex link">Health & Personal Care</p>

      </div>
    </header>
  )
}

export default Header
