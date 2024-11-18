"use client";
import { UserCard } from "@/components/UserCard";
import { useState, useEffect } from "react";
import ApiClient from "../ApiClient/client";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const apiClient = new ApiClient();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getUsers();
      setUsers(response.data.results);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Random User Directory
          </h1>
          <p className="text-gray-600">
            Browse through our collection of randomly generated users.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.login.uuid}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
