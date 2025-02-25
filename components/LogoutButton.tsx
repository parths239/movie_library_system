import React from 'react'
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  return (
    <div>
        <form
            action={async () => {
              
              "use server";

              await signOut();
            }}
          >
            <Button className="text-dark-500">Logout</Button>
          </form>
    </div>
  )
}

export default LogoutButton