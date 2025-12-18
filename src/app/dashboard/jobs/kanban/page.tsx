"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, User, ArrowLeft } from "lucide-react"
import { getJobs, updateJob, getClients } from "@/lib/supabase/actions"
import { JobModal } from "@/components/job-modal"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

type JobStatus = "pending" | "in_progress" | "completed"

type Job = {
  id: string
  title: string
  client_id: string
  status: JobStatus
  due_date: string
  description?: string
  clients?: { id: string; name: string }
  created_at?: string
}

type Client = {
  id: string
  name: string
}

const columns = [
  { id: "pending", title: "Pending", color: "bg-yellow-500" },
  { id: "in_progress", title: "In Progress", color: "bg-blue-500" },
  { id: "completed", title: "Completed", color: "bg-green-500" },
]

export default function JobsKanbanPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [draggedJob, setDraggedJob] = useState<Job | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    const [jobData, clientData] = await Promise.all([getJobs(), getClients()])
    setJobs(jobData as Job[])
    setClients(clientData as Client[])
    setIsLoading(false)
  }

  const handleCreateJob = () => {
    setSelectedJob(null)
    setModalOpen(true)
  }

  const handleEditJob = (job: Job) => {
    setSelectedJob(job)
    setModalOpen(true)
  }

  const handleSaveJob = async () => {
    await loadData()
    setModalOpen(false)
  }

  const handleDragStart = (job: Job) => {
    setDraggedJob(job)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (status: JobStatus) => {
    if (!draggedJob || draggedJob.status === status) {
      setDraggedJob(null)
      return
    }

    const result = await updateJob(draggedJob.id, { status })

    if (!result?.error) {
      await loadData()
    } else {
      alert("Error updating job: " + result.error)
    }

    setDraggedJob(null)
  }

  const getJobsByStatus = (status: JobStatus) => {
    return jobs.filter((job) => job.status === status)
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading jobs...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/jobs">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Jobs Kanban</h1>
            <p className="text-muted-foreground mt-1">Drag and drop to update job status</p>
          </div>
        </div>
        <Button onClick={handleCreateJob}>
          <Plus className="mr-2 h-4 w-4" />
          New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((column) => {
          const columnJobs = getJobsByStatus(column.id as JobStatus)
          return (
            <Card key={column.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <CardTitle className="text-base">{column.title}</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    {columnJobs.length}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid gap-6 md:grid-cols-3">
        {columns.map((column) => {
          const columnJobs = getJobsByStatus(column.id as JobStatus)

          return (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Badge variant="outline" className="ml-auto">
                  {columnJobs.length}
                </Badge>
              </div>

              {/* Drop Zone */}
              <div
                className={`min-h-[500px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                  draggedJob && draggedJob.status !== column.id
                    ? "border-primary bg-primary/5"
                    : "border-muted bg-muted/20"
                }`}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id as JobStatus)}
              >
                {columnJobs.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                    No jobs in this status
                  </div>
                ) : (
                  <div className="space-y-3">
                    {columnJobs.map((job) => (
                      <Card
                        key={job.id}
                        className="cursor-move hover:shadow-lg transition-shadow group"
                        draggable
                        onDragStart={() => handleDragStart(job)}
                        onClick={() => handleEditJob(job)}
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base group-hover:text-primary transition-colors">
                            {job.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">{job.description || "No description"}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {job.clients && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span>{job.clients.name}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-3 w-3" />
                              <span className={isOverdue(job.due_date) ? "text-red-500 font-medium" : ""}>
                                {new Date(job.due_date).toLocaleDateString("en-ZA")}
                              </span>
                            </div>
                            {isOverdue(job.due_date) && column.id !== "completed" && (
                              <Badge variant="destructive" className="text-xs">
                                Overdue
                              </Badge>
                            )}
                          </div>
                          {job.created_at && (
                            <div className="text-xs text-muted-foreground">
                              Created {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <JobModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        job={selectedJob}
        clients={clients}
        onSave={handleSaveJob}
      />
    </div>
  )
}
