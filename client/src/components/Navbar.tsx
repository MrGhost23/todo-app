import { logout, selectUser } from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppDispatch } from "@/store/store";
import { MdOutlineMenu } from "react-icons/md";

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="relative mb-4 px-5 py-4 flex justify-between items-center border-b bg-white">
      <Link className="text-3xl font-bold leading-none text-blue-500" to="/">
        InfraTodo
      </Link>
      <div className="flex mr-4 items-center gap-4">
        <p className="font-semibold">Hello, {user?.firstName}</p>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus-visible:outline-none focus-visible:ring-0 outline-none border-none">
              <FaUserAlt className="text-gray-800 size-5 focus:outline-none focus-visible:outline-none focus-visible:ring-0 outline-none border-none" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10 bg-white mr-4">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer bg-white hover:bg-gray-200">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer bg-white hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <MdOutlineMenu className="text-gray-800 size-6 focus:outline-none outline-none border-none f" />
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div> */}
      </div>
    </nav>
  );
};
export default Navbar;
