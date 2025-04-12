'use client'
import React, { useEffect, useState } from "react";

interface Message {
    M_id: number;
    name: string;
    email: string;
    message: string;
}

function page() {
  const [Messages, setMessages] = useState([] as Message[])
  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      if (!response.ok) {
        throw new Error("Failed to fetch Messages");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching Messages", error)
    }
  }

  useEffect(() => {
    fetchMessages()
  },[])
  return (
    <>
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Received Messages</h1>

      {Messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {Messages.map((msg) => (
                <tr key={msg.M_id}>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{msg.name}</td>
                  <td className="px-4 py-2 text-sm text-blue-500 dark:text-blue-400">
                    <a href={`mailto:${msg.email}`}>{msg.email}</a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{msg.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  )

}

export default page;
