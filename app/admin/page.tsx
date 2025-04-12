"use client";
import Link from "next/link";
import React from "react";

function page() {
  return <div>
    <h1 className="mt-[8%]">Admin Dashboard</h1>
    <ul>
      <li><Link href={'/admin/editsite'}>View and Edit Site Details</Link></li>
      <li><Link href={'/admin/messages'}>View Messages</Link></li>
      <h1>site data:</h1>
          <h2>this will include:</h2> <br /> the number of visitors on the site<br /> where the visitors are from <br /> time of when they visisted <br /> it displays a map and then dots on the map represent the customers <br /> a graph which shows that how is the traffic of site going i.e. a line graph
    </ul>
  </div>;
}

export default page;
