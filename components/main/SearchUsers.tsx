import React, { useState } from "react";
import { fbSearchUsers } from "@/firebase/fbSearchUsers"; // Import the search function
import UserCardRegular from "../Cards/UserCardRegular";

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const users = await fbSearchUsers(searchQuery);

        setResults(users);
      } catch (error) {
        console.error("Error searching users:", error);
        // Handle error as needed
      }
    }
  };
  console.log(searchQuery);

  return (
    <div>
      <form className="input flex justify-between" onSubmit={handleSearch}>
        <input
          className="bg-transparent w-[150px] focus:outline-none placeholder:text-slate-200 "
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      <div className="flex flex-col items-center">
        <div className="m-2 flex flex-col gap-2">
          {results.map((user) => (
            <UserCardRegular key={user.userId} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
