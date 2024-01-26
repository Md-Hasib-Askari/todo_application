import {
  Avatar,
  AvatarIcon,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger, Link
} from "@nextui-org/react";
import {useState} from "react";
import {FaMoon, FaSun} from "react-icons/fa6";
import {userStore} from "../store/userStore.ts";
import * as fetchUser from "../api/fetchUser.ts";
import {redirect} from "react-router-dom";

export default function AvatarComponent() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const {isLoggedIn, setIsLoggedIn} = userStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    setIsLoggedIn: state.setIsLoggedIn
  }));
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  }
  const handleLogout = async () => {
    const response = await fetchUser.logout();
    if (response.status === 200) {
      document.cookie = "";
      setIsLoggedIn(false);
      redirect("/");
    }
  }
  return (
      <div className="flex items-center gap-2">
        <Button
            className="bg-transparent w-full"
            radius="full"
            isIconOnly={true}
            onClick={handleDarkMode}
        >
          <Avatar
              icon={darkMode ? <FaMoon /> : <FaSun /> }
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
                        onClick={() => {
                          console.log("test");
                        }}
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
                  <DropdownMenu aria-label="Static Actions" className="dark:text-white">
                    <DropdownItem key="change-password">Change Password</DropdownItem>
                    <DropdownItem key="logout" color="danger">
                      <Link className="text-danger hover:text-white size-[100%] p-0"
                      onClick={handleLogout}>Logout</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

            )
        }

      </div>
  );
}
