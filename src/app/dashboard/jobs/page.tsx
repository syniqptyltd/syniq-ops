"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Eye, Pencil, Trash2, Briefcase, LayoutGrid, FileText } from "lucide-react"
import { JobModal } from "@/components/job-modal"
import { getJobs, deleteJob, getClients } from "@/lib/supabase/actions"
import { generateInvoiceFromJob } from "@/lib/invoice-automation"
import Link from "next/link"
import { useRouter } from "next/navigation"

type JobStatus = "pending" | "in_progress" | "completed"

type Job = {
  id: string
  title: string
  client_id: string
  status: JobStatus
  due_date: string
  description?: string
  pricing_type?: "fixed" | "hourly"
  fixed_price?: number | null
  hourly_rate?: number | null
  hours_worked?: number | null
  clients?: { id: string; name: string }
  created_at?: string
}

type Client = {
  id: string
  name: string
}

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "secondary" as const,
  },
  in_progress: {
    label: "In Progress",
    variant: "default" as const,
  },
  completed: {
    label: "Completed",
    variant: "outline" as const,
  },
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const router = useRouter()

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

  const handleViewJob = (jobId: string) => {
    console.log("View job:", jobId)
  }

  const handleEditJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId)
    if (job) {
      setSelectedJob(job)
      setModalOpen(true)
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      const result = await deleteJob(jobId)
      if (result?.error) {
        alert("Error deleting job: " + result.error)
      } else {
        await loadData()
      }
    }
  }

  const handleSaveJob = async () => {
    await loadData()
    setModalOpen(false)
  }

  const handleGenerateInvoice = async (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId)
    if (!job) return

    const client = clients.find((c) => c.id === job.client_id)
    if (!client) {
      alert("Client not found for this job")
      return
    }

    // Check if job has pricing information
    const hasFixedPrice = job.pricing_type === "fixed" && job.fixed_price && job.fixed_price > 0
    const hasHourlyRate = job.pricing_type === "hourly" && job.hourly_rate && job.hours_worked

    if (!hasFixedPrice && !hasHourlyRate) {
      alert("This job doesn't have pricing information. Please edit the job and add a fixed price or hourly rate.")
      return
    }

    // Confirm with user
    const confirmMessage = hasFixedPrice
      ? `Generate invoice for R${job.fixed_price?.toFixed(2)} (fixed price)?`
      : `Generate invoice for ${job.hours_worked} hours at R${job.hourly_rate?.toFixed(2)}/hr?`

    if (!confirm(confirmMessage)) return

    try {
      const result = await generateInvoiceFromJob({
        job: job as any,
        clientName: client.name,
      })

      if (result.error) {
        alert("Error generating invoice: " + result.error)
      } else {
        alert(`Invoice ${result.invoiceNumber} created successfully! Total: R${result.total?.toFixed(2)}`)
        router.push("/dashboard/invoices")
      }
    } catch (error) {
      console.error("Error generating invoice:", error)
      alert("An unexpected error occurred while generating the invoice")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground mt-1">Track and manage your ongoing work</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/jobs/kanban">
            <Button variant="outline">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Kanban View
            </Button>
          </Link>
          <Button onClick={handleCreateJob}>
            <Plus className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        </div>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Briefcase className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="mb-2">No jobs yet</CardTitle>
            <CardDescription className="text-center mb-6 max-w-sm">
              Start managing your work by creating your first job. Keep track of deadlines and progress all in one
              place.
            </CardDescription>
            <Button onClick={handleCreateJob}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Jobs</CardTitle>
            <CardDescription>A list of all your jobs and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.clients?.name || "No client"}</TableCell>
                      <TableCell>
                        <Badge variant={statusConfig[job.status].variant}>{statusConfig[job.status].label}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(job.due_date)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewJob(job.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditJob(job.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleGenerateInvoice(job.id)}>
                              <FileText className="mr-2 h-4 w-4 text-green-600" />
                              Generate Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteJob(job.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
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
