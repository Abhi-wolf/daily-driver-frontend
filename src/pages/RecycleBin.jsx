import { useState } from "react";
import DeletedFiles from "../components/RecycleBin/DeletedFiles";
import DeletedFolders from "../components/RecycleBin/DeletedFolders";
import { Button } from "../components/ui/button";
import DataNotFound from "../components/DataNotFound";
import { Trash2 } from "lucide-react";
import WorkInProgressMessage from "../components/WorkInProgressMessage";

function RecycleBin() {
  const [isRecycleBinEmpty, setIsRecycleBinEmpty] = useState(false);

  return (
    <section className="w-full flex justify-center items-center">
      {/* <DeletedFolders setIsRecycleBinEmpty={setIsRecycleBinEmpty} />
      <DeletedFiles setIsRecycleBinEmpty={setIsRecycleBinEmpty} />

      {isRecycleBinEmpty && (
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <Trash2 className="w-16 h-16 text-gray-400" />
          <DataNotFound size="xl " message="Trash is Empty" />
        </div>
      )}

      <Button
        variant="outline"
        disabled={true}
        className={`absolute bottom-16 right-8 bg-red-600 ${
          isRecycleBinEmpty ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Empty Trash
      </Button> */}

      <WorkInProgressMessage />
    </section>
  );
}

export default RecycleBin;
