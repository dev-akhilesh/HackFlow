import { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleDropdownClick = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value); // Use event.target.value directly in the log
  };

  return (
    <div className="bg-indigo-600">
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={handleSidebarToggle}
      >
        <i className="bi bi-filter-left px-2 bg-indigo-600 rounded-md"></i>
      </span>
      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center ${
          isSidebarOpen ? "bg-indigo-600" : "hidden"
        }`}
      >
        <div className="text-white-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <h1 className="font-bold text-white text-2xl ml-3">HackFlow</h1>
            <i
              className={`bi bi-x cursor-pointer ml-28 text-white lg:hidden ${
                isSidebarOpen ? "" : "hidden"
              }`}
              onClick={handleSidebarToggle}
            ></i>
          </div>
          <div className="my-2 bg-indigo-800 h-[1px]"></div>
        </div>
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-indigo-800 text-white">
          <i className="bi bi-search text-sm"></i>
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-indigo-500 text-white">
          <i className="bi bi-house-door-fill"></i>
          <span className="text-[15px] ml-4 text-white-200 font-bold">
            Home
          </span>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-indigo-500 text-white">
          <i className="bi bi-bookmark-fill"></i>
          <span className="text-[15px] ml-4 text-white-200 font-bold">
            Bookmark
          </span>
        </div>
        <div className="my-4 bg-indigo-900 h-[1px]"></div>

        <div className=" mt-3 flex-col items-center rounded-md duration-300 cursor-pointer  text-white ">
          <div className="hover:bg-indigo-500 p-2.5  rounded-md px-4 duration-300 cursor-pointer  text-white text-left">
            <i className="bi bi-file-code-fill"></i>
            <label
              htmlFor="programmingLang"
              className="text-[15px] ml-4 text-white-200 font-bold "
            >
              Choose your Tech Stack:
            </label>
          </div>

          <select
            id="programmingLang"
            className=" w-4/6 text-left mt-2 p-2.5 bg-indigo-600 text-white rounded-md focus:outline-none font-bold "
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Select an option</option>
            <option value="MERN">MERN</option>
            <option value="Java">Java</option>
            <option value="NodeJs">NodeJs</option>
          </select>
        </div>

        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-indigo-500 text-white"
          onClick={handleDropdownClick}
        >
          <i className="bi bi-chat-left-text-fill"></i>
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-white-200 font-bold">
              For You
            </span>
            <span
              className={`text-sm ${isSubMenuOpen ? "rotate-180" : ""}`}
              id="arrow"
            >
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>
        <div
          className={`text-left text-sm mt-2 w-4/5 mx-auto text-white-200 font-bold ${
            isSubMenuOpen ? "" : "hidden"
          }`}
          id="submenu"
        >
          <h1 className="cursor-pointer p-2 hover:bg-indigo-500 rounded-md mt-1 text-white">
            History
          </h1>
          <h1 className="cursor-pointer p-2 hover:bg-indigo-500 rounded-md mt-1 text-white">
            Review
          </h1>
          <h1 className="cursor-pointer p-2 hover:bg-indigo-500 rounded-md mt-1 text-white">
            Feedback
          </h1>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-indigo-500 text-white">
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="text-[15px] ml-4 text-white-200 font-bold">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
