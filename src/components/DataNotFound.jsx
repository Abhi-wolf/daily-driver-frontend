/* eslint-disable react/prop-types */
function DataNotFound({ size, message }) {
  return (
    <div
      className={`w-full h-full flex justify-center items-center italic text-sm md:text-${size} text-gray-500 font-semibold mt-4 p-2`}
    >
      {message ? message : "Data Not found"} 😔
    </div>
  );
}

export default DataNotFound;
