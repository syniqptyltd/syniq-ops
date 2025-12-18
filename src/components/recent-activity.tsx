"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileText, Briefcase, Users, DollarSign, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type Activity = {
  id: string
  type: "invoice" | "job" | "client" | "payment"
  title: string
  description: string
  timestamp: string
  status?: "success" | "warning" | "pending"
}

type RecentActivityProps = {
  activities: Activity[]
}

const activityIcons = {
  invoice: FileText,
  job: Briefcase,
  client: Users,
  payment: DollarSign,
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  warning: {
    icon: AlertCircle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  pending: {
    icon: Clock,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest business operations at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No recent activity. Start by adding clients, creating jobs, or sending invoices!
            </p>
          ) : (
            activities.map((activity) => {
              const Icon = activityIcons[activity.type]
              const statusInfo = activity.status ? statusConfig[activity.status] : null
              const StatusIcon = statusInfo?.icon

              return (
                <div key={activity.id} className="flex items-start gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className={statusInfo?.bgColor || "bg-muted"}>
                      <Icon className={`h-4 w-4 ${statusInfo?.color || "text-muted-foreground"}`} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      {activity.status && StatusIcon && (
                        <Badge variant="outline" className="ml-2">
                          <StatusIcon className={`mr-1 h-3 w-3 ${statusInfo.color}`} />
                          <span className="capitalize">{activity.status}</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
