import {
  Avatar,
  AvatarIcon,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger, useDisclosure
} from "@nextui-org/react";
import {Key, useState} from "react";
import {FaMoon, FaSun} from "react-icons/fa6";
import {userStore} from "../store/userStore.ts";
import * as fetchUser from "../api/fetchUser.ts";
import {redirect} from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal.tsx";
import {setCookie, getCookie} from "../utils/cookie.ts";

export default function AvatarComponent() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const {isLoggedIn, setIsLoggedIn} = userStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    setIsLoggedIn: state.setIsLoggedIn
  }));
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  }
  const handleDropdown = async (key: Key) => {
    if (key === "logout") {
      const response = await fetchUser.logout();
      if (response.status === 200) {
        setCookie("token", "", 0);
        setCookie("email", "", 0);
        setIsLoggedIn(false);
        redirect("/");
      }
    } else if (key === "changePassword") {
      onOpen();
    }
  }
  return (
      <div className="flex items-center gap-2">
        {isOpen && <ChangePasswordModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />}
        <Button
            className="bg-transparent w-full"
            radius="full"
            isIconOnly={true}
            onClick={handleDarkMode}
        >
          <Avatar
              icon={darkMode ? <FaMoon size="25px" /> : <FaSun size="25px" /> }
              classNames={{
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              }}
          />
        </Button>
        {
          isLoggedIn && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                        className="bg-transparent w-full"
                        radius="full"
                        isIconOnly={true}
                    >
                      <Avatar
                          icon={<AvatarIcon />}
                          classNames={{
                            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                            icon: "text-black/80",
                          }}
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu onAction={(key) => handleDropdown(key)} aria-label="Static Actions" className="dark:text-white">
                    <DropdownItem key="profile" isDisabled className="gap-2" showDivider>
                      {getCookie("email")}
                    </DropdownItem>
                    <DropdownItem key="changePassword" >
                      Change Password
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

            )
        }

      </div>
  );
}
