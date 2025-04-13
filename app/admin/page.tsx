"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip } from "recharts"
import { Users, Globe, Clock, ArrowUp, ArrowDown, MapPin } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminSidebar from "@/components/adminsections/AdminSidebar"

// Mock data for demonstration
const visitorData = [
  { date: "Jan", visitors: 400 },
  { date: "Feb", visitors: 300 },
  { date: "Mar", visitors: 500 },
  { date: "Apr", visitors: 280 },
  { date: "May", visitors: 590 },
  { date: "Jun", visitors: 800 },
  { date: "Jul", visitors: 810 },
]

const locationData = [
  { country: "USA", visitors: 1200 },
  { country: "UK", visitors: 940 },
  { country: "Canada", visitors: 650 },
  { country: "Australia", visitors: 430 },
  { country: "Germany", visitors: 290 },
  { country: "France", visitors: 220 },
  { country: "India", visitors: 780 },
]

const recentVisits = [
  { id: 1, location: "New York, USA", time: "2 minutes ago", browser: "Chrome" },
  { id: 2, location: "London, UK", time: "5 minutes ago", browser: "Firefox" },
  { id: 3, location: "Toronto, Canada", time: "10 minutes ago", browser: "Safari" },
  { id: 4, location: "Sydney, Australia", time: "15 minutes ago", browser: "Edge" },
  { id: 5, location: "Berlin, Germany", time: "20 minutes ago", browser: "Chrome" },
]

export default function AdminDashboard() {
  const [totalVisitors, setTotalVisitors] = useState(4320)
  const [visitorChange, setVisitorChange] = useState(12.5)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoaded(true)
    }, 500)
  }, [])

  const dashboardContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {visitorChange > 0 ? (
                <ArrowUp className="mr-1 h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-rose-500" />
              )}
              <span className={visitorChange > 0 ? "text-emerald-500" : "text-rose-500"}>
                {Math.abs(visitorChange)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Geographic Reach</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 Countries</div>
            <div className="text-xs text-muted-foreground">Top regions: North America, Europe, Asia</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 42s</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDown className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">3%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 overflow-hidden">
          <CardHeader>
            <CardTitle>Visitor Trends</CardTitle>
            <CardDescription>Monthly visitor statistics</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={{ stroke: "var(--border)" }} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "var(--border)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      color: "var(--card-foreground)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    activeDot={{ r: 8, fill: "var(--chart-1)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 overflow-hidden">
          <CardHeader>
            <CardTitle>Visitor Locations</CardTitle>
            <CardDescription>Top countries by visitor count</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" tick={{ fontSize: 12 }} tickLine={{ stroke: "var(--border)" }} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "var(--border)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      color: "var(--card-foreground)",
                    }}
                  />
                  <Bar dataKey="visitors" fill="var(--chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Visitors</CardTitle>
          <CardDescription>Latest site activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentVisits.map((visit) => (
              <div key={visit.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-secondary p-2">
                    <MapPin className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{visit.location}</p>
                    <p className="text-xs text-muted-foreground">{visit.browser}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{visit.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return <AdminSidebar>{dashboardContent}</AdminSidebar>
}
