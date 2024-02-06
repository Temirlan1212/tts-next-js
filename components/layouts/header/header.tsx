"use client";

import logo from "../../../public/voice-logo.png"
import userLogo from "../../../public/avatar.png"
import Image from "next/image";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, DropdownSection } from "@nextui-org/react";

export default function Header() {
  return (
    <div className="h-[4rem] bg-slate-100 flex items-center px-28 border-b-2 border-gray-400 justify-between">
      <Button>
        <Image src={logo} alt={"logo"} width={50} />
      </Button>
      <div>
        <Dropdown>
          <DropdownTrigger>
            {userLogo ?
              <Button className="bg-zinc-300 rounded-full w-10 h-10 flex items-center justify-center">
                <Image src={userLogo} alt={"logo"} />
              </Button> :
              <Button variant="bordered">menu</Button>
            }
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownSection title="mail" className="text-sm bg-slate-50 p-2 rounded-md border-2">
              <DropdownItem key="profile" className="cursor-pointer">profile</DropdownItem>
              <DropdownItem key="logOut" className="cursor-pointer">log-out</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
