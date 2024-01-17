"use client";

import React, { useEffect } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserLoginDetails, setSignOutState } from "@/Redux/UserState";
import Faucet from "@/Contract/Faucet.json";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: {
      request: (request: { method: string }) => Promise<string[]>;
    };
  }
}

export default function CNavabar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      const web3 = new Web3(window.ethereum);
      const FaucetInst = new web3.eth.Contract(Faucet, "0x2c443a31076639Fd651C779b32523fC6d1D46bE5");
      dispatch(setUserLoginDetails({ address: account, faucetInstance: FaucetInst  }));
    }
  };

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      {/* <NavbarContent justify='start'>
        <NavbarBrand>
          <Image className='bg-black p-2' src={"https://i.seadn.io/s/raw/files/07f2bad57a292a1202c5324a7374fcd4.png?auto=format&dpr=1&w=256"} alt='Atrox Logo' width={50} height={50} />
          <p className='hidden sm:block font-bold text-inherit'>$HANZ</p>
        </NavbarBrand>
      </NavbarContent>
      <Dropdown>
        <DropdownTrigger className='md:hidden'>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            color='secondary'
            name='Anony'
            size='sm'
            src='https://getwallpapers.com/wallpaper/full/2/e/0/1386406-light-yagami-wallpaper-1920x1080-for-iphone-5s.jpg'
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2'>
            <p className='font-semibold'>Signed in as</p>
            <p className='font-semibold'>{user.address.length > 0 ? user.address : "No Account"}</p>
          </DropdownItem>
          {user.address.length > 0 ? (
            <DropdownItem key='logout' color='danger' onClick={() => dispatch(setSignOutState())}>
              Logout
            </DropdownItem>
          ) : (
            <DropdownItem key='login' color='danger' onClick={() => connectWallet()}>
              Connect Wallet
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className='sm:hidden' />

      <NavbarContent as='div' className='items-center hidden md:flex' justify='end'>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name='Jason Hughes'
              size='sm'
              src={"https://getwallpapers.com/wallpaper/full/2/e/0/1386406-light-yagami-wallpaper-1920x1080-for-iphone-5s.jpg"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>{user.address.length > 0 ? user.address : "No Account"}</p>
            </DropdownItem>
            {user.address.length > 0 ? (
              <DropdownItem key='logout' color='danger' onClick={() => dispatch(setSignOutState())}>
                Logout
              </DropdownItem>
            ) : (
              <DropdownItem key='login' color='danger' onClick={() => connectWallet()}>
                Connect Wallet
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu></NavbarMenu> */}
    </Navbar>
  );
}
