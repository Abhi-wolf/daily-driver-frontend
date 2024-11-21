import { Separator } from "@/components/ui/separator";
import UpdatePassword from "../components/Profile/UpdatePassword";
import UserProfile from "../components/Profile/UserProfile";

export default function Profile() {
  return (
    <div className=" w-full bg-gradient-to-b from-background to-secondary/20 ">
      <main className="container mx-auto px-4 py-6  overflow-y-auto">
        <div className="bg-background rounded-lg  ">
          <div className="bg-primary h-32 md:h-48"></div>
          <div className="px-4 md:px-8 pb-8">
            <UserProfile />
            <Separator className="my-8" />
            <div className="text-center">
              <UpdatePassword />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
