// import { useState } from "react";
import BookmarkView from "../components/Bookmark/BookmarkView";
import { Bookmark, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import AddOrEditBookMark from "../components/Bookmark/AddOrEditBookMark";

function Bookmarks() {
  // const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Bookmark className="w-8 h-8 text-primary" />
            My Bookmarks
          </h2>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* <div className="relative flex-grow sm:flex-grow-0 mt-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div> */}
            <AddOrEditBookMark>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Bookmark
              </Button>
            </AddOrEditBookMark>
          </div>
        </div>
        <BookmarkView />
      </div>
    </div>
  );
}

export default Bookmarks;
