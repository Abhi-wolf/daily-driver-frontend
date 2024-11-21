import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, FileMusic, FolderGit2 } from "lucide-react";
import { memo } from "react";
import { useGetUserProfile } from "../../hooks/useUser";
import { MediumSpinner } from "../Spinners";

function UserProfile() {
  const { data, isPending } = useGetUserProfile();

  if (isPending && !data) {
    return <MediumSpinner />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:items-end md:-mt-16 gap-6 md:gap-8">
        <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background rounded-full overflow-hidden">
          <AvatarImage
            src="/placeholder.svg?height=160&width=160"
            alt="User's profile picture"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">{data?.user?.name}</h1>
          <p className="text-muted-foreground">{data?.user?.email}</p>
        </div>
      </div>

      <Separator className="my-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <FolderGit2 className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Projects</span>
            </div>
            <span className="text-2xl font-bold">{data?.projects}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <Bookmark className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium"> Bookmarks</span>
            </div>
            <span className="text-2xl font-bold">{data?.bookmarks}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <FileMusic className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Songs</span>
            </div>
            <span className="text-2xl font-bold">{data?.songs}</span>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default memo(UserProfile);
