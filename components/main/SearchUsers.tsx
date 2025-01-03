import React, { useState, useEffect } from "react";
import { fbSearchUsers } from "@/firebase/fbSearchUsers"; // Import the search function
import UserCardRegular from "../Cards/UserCardRegular";
import Search from "../Icons/Search";

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loader, setLoader] = useState(false);

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500); // Adjust the debounce time (500ms)

    return () => {
      clearTimeout(handler); // Cleanup the timeout on input change
    };
  }, [searchQuery]);

  // Perform the search when the debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      setLoader(true);
      if (debouncedQuery !== "") {
        try {
          const users = await fbSearchUsers(debouncedQuery);
          setResults(users);
        } catch (error) {
          console.error("Error searching users:", error);
          // Handle error as needed
        }
        setLoader(false);
      } else {
        setResults([]); // Clear results if the query is empty
        setLoader(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  return (
    <div>
      <form
        className="input flex justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="bg-transparent w-[150px] focus:outline-none placeholder:text-slate-200"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
        />
        <button className="btn" type="submit" disabled>
          <Search />
        </button>
      </form>
      <div className="flex flex-col items-center">
        {loader ? (
          <span className="loader-spinner mt-4"></span>
        ) : (
          <div className="m-2 flex flex-col gap-2">
            {results.map((user) => (
              <UserCardRegular key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
