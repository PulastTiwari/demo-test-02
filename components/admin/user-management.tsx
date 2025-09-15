"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserPlus, MoreHorizontal, Shield, ShieldCheck, ShieldX } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "citizen" | "official" | "analyst"
  status: "active" | "suspended" | "pending"
  joinDate: string
  lastActive: string
  reportsSubmitted: number
  verified: boolean
}

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock user data
  const users: User[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gmail.com",
      role: "citizen",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      reportsSubmitted: 12,
      verified: true,
    },
    {
      id: "2",
      name: "Dr. Priya Sharma",
      email: "priya.sharma@incois.gov.in",
      role: "official",
      status: "active",
      joinDate: "2023-11-20",
      lastActive: "30 minutes ago",
      reportsSubmitted: 45,
      verified: true,
    },
    {
      id: "3",
      name: "Amit Patel",
      email: "amit.patel@yahoo.com",
      role: "citizen",
      status: "pending",
      joinDate: "2024-01-20",
      lastActive: "1 day ago",
      reportsSubmitted: 3,
      verified: false,
    },
    {
      id: "4",
      name: "Sarah Johnson",
      email: "sarah.j@analyst.com",
      role: "analyst",
      status: "active",
      joinDate: "2023-12-10",
      lastActive: "5 minutes ago",
      reportsSubmitted: 78,
      verified: true,
    },
    {
      id: "5",
      name: "Mohammed Ali",
      email: "m.ali@hotmail.com",
      role: "citizen",
      status: "suspended",
      joinDate: "2024-01-10",
      lastActive: "3 days ago",
      reportsSubmitted: 1,
      verified: false,
    },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "official":
        return ShieldCheck
      case "analyst":
        return Shield
      default:
        return ShieldX
    }
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      official: "default",
      analyst: "secondary",
      citizen: "outline",
    }
    return colors[role as keyof typeof colors] || "outline"
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "default",
      pending: "secondary",
      suspended: "destructive",
    }
    return colors[status as keyof typeof colors] || "outline"
  }

  const filteredUsers = users.filter((user) => {
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    if (roleFilter !== "all" && user.role !== roleFilter) return false
    if (statusFilter !== "all" && user.status !== statusFilter) return false
    return true
  })

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-manrope text-xl">User Management</CardTitle>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="citizen">Citizens</SelectItem>
              <SelectItem value="official">Officials</SelectItem>
              <SelectItem value="analyst">Analysts</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reports</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const RoleIcon = getRoleIcon(user.role)
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <RoleIcon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {user.name}
                          {user.verified && (
                            <Badge variant="outline" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadge(user.role) as any} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(user.status) as any} className="capitalize">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.reportsSubmitted}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No users found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
