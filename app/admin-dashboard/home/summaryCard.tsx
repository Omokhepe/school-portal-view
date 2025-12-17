import React from "react";
import useAppStore from "@store/appStore";

const SummaryCard = () => {
  const { students, teachers } = useAppStore();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center mt-5">
        {/*{stats.map((cls) => (*/}
        <div
          // key={cls.id}
          className="flex flex-col items-center border w-80 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-off-white"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Students</h3>
          </div>

          <p className="text-3xl font-bold">{students.length}</p>
          <p className="text-sm text-gray-500">Total students</p>
        </div>
        <div
          // key={cls.id}
          className="flex flex-col items-center border w-80 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-off-white"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Teachers</h3>
          </div>

          <p className="text-3xl font-bold">{teachers.length}</p>
          <p className="text-sm text-gray-500">Total Teachers</p>
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
