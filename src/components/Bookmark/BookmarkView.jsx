/* eslint-disable react/prop-types */

import InfiniteBookmarkView from "./InfiniteBookmarkView";

export default function BookmarkView() {
  return (
    <div className="w-full h-full max-h-[80vh] overflow-y-auto">
      <InfiniteBookmarkView />
    </div>
  );
}
