import React, { useEffect, useState } from "react";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        console.log(data);
        setUser(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-8">Loading profile...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col min-w-[70vw]">
      <h1 className="text-3xl p-8 font-black mb-4">Profile</h1>

      {user && (
        <div className="px-8">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};
 