// import Link from "next/link";
// import Image from "next/image";
// import { signOut } from "@/auth";
// import { Button } from "@/components/ui/button";

// const Header = () => {
//   return (
//     <header className="my-10 flex justify-between gap-5">
//       <Link href="/">
//         <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
//       </Link>

//       <ul className="flex flex-row items-center gap-8">
//         <li>
//           <form
//             action={async () => {
//               "use server";

//               await signOut();
//             }}
//             className="mb-10"
//           >
//             <Button>Logout</Button>
//           </form>
//         </li>
//       </ul>
//     </header>
//   );
// };

// export default Header;

import Link from "next/link";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";
import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const Header = async () => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex flex-row items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <h2 className="font-bebas-neue text-4xl text-light-100 hidden sm:block">
          BookWise
        </h2>
      </Link>

      <ul className="flex flex-row items-center gap-8 items-start">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/search">Search</Link>
        </li>
        <li className="flex flex-row gap-2 items-center">
          <Link href={
            '/my-profile'
          }>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </Link>
        </li>
        <li>

            <CiLogout className="cursor-pointer" onClick={async () => {
              
              "use server";

              await signOut();
            }} style={{ color: "red" }} />

        </li>
      </ul>
    </header>
  );
};

export default Header;

