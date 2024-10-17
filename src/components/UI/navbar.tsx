"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import {  AiFillLock } from 'react-icons/ai';
import Loading from "./Loading";
import { useUser } from "@/src/context/user.provider";
import { ThemeSwitch } from "@/src/components/UI/theme-switch";
import { siteConfig } from "@/src/config/site";
import { logout } from "@/src/services/authService";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { CheckIcon } from "@/src/assets/icons";

export const Navbar = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {isLoading && <Loading />}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              alt=""
              height={100}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9lsguElms4_3HsOiZYnDQjQc8iRPxN7-Qw&s"
              width={100}
            />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch /> 
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          {user?.isVerified ? <Chip
            variant="shadow"
            startContent={<CheckIcon size={18} />}
            size='lg'
            classNames={{
              base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
              content: "drop-shadow shadow-black text-white",
            }}
          >
            Verified
          </Chip> : <Button
            className="bg-blue-500 text-white flex items-center ml-4"
            onClick={() => router.push("/make-payment")}
          >
            <AiFillLock className="h-5 w-5 mr-2" />
            Try Premium
          </Button>}

        </NavbarItem>
      </NavbarContent>
      <div>
        <NavbarContent className="sm:hidden basis-1 pl-4">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>


        <NavbarContent>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={user?.profileImage}
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem
                key="settings"
                onClick={() => router.push("/profile/settings")}
              >
                My Profile
              </DropdownItem>
              {/* </Link> */}
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => handleLogout()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </div>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
