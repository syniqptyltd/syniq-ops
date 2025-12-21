"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Eye, Pencil, Trash2, Users, Crown, AlertCircle } from "lucide-react"
import { ClientModal } from "@/components/client-modal"
import { getClients, deleteClient } from "@/lib/supabase/actions"
import { useRouter } from "next/navigation"
import { useSubscription } from "@/hooks/use-subscription"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

type Client = {
  id: string
  name: string
  email: string
  phone: string
  notes?: string
  created_at?: string
}

export default function ClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const { permissions, planId, loading: subscriptionLoading } = useSubscription()

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    setIsLoading(true)
    const data = await getClients()
    setClients(data)
    setIsLoading(false)
  }

  const handleAddClient = () => {
    // Check if user has reached client limit
    if (permissions.maxClients !== null && clients.length >= permissions.maxClients) {
      return // Don't open modal if limit reached
    }
    setSelectedClient(null)
    setModalOpen(true)
  }

  const canAddClient = permissions.maxClients === null || clients.length < permissions.maxClients
  const clientsRemaining = permissions.maxClients ? permissions.maxClients - clients.length : null

  const handleViewClient = (clientId: string) => {
    // Navigate to client detail page or open modal
    console.log("View client:", clientId)
  }

  const handleEditClient = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setModalOpen(true)
    }
  }

  const handleDeleteClient = async (clientId: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      const result = await deleteClient(clientId)
      if (result?.error) {
        alert("Error deleting client: " + result.error)
      } else {
        await loadClients()
      }
    }
  }

  const handleSaveClient = async () => {
    await loadClients()
    setModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading clients...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your client relationships
            {permissions.maxClients !== null && (
              <span className="ml-2 text-sm">
                ({clients.length} / {permissions.maxClients} clients)
              </span>
            )}
          </p>
        </div>
        <Button onClick={handleAddClient} disabled={!canAddClient}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Client limit warning */}
      {permissions.maxClients !== null && clientsRemaining !== null && clientsRemaining <= 5 && clientsRemaining > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="ml-2 flex items-center justify-between">
            <span className="text-orange-900">
              You have {clientsRemaining} client {clientsRemaining === 1 ? "slot" : "slots"} remaining on the Starter plan.
            </span>
            <Button asChild size="sm" variant="outline" className="ml-4">
              <Link href="/pricing">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade for Unlimited
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Client limit reached */}
      {!canAddClient && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="ml-2 flex items-center justify-between">
            <span className="text-red-900">
              You've reached the maximum of {permissions.maxClients} clients on the Starter plan.
            </span>
            <Button asChild size="sm" className="ml-4">
              <Link href="/pricing">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Professional
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {clients.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Users className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="mb-2">No clients yet</CardTitle>
            <CardDescription className="text-center mb-6 max-w-sm">
              Get started by adding your first client. Keep track of all your business relationships in one place.
            </CardDescription>
            <Button onClick={handleAddClient}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Client
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
            <CardDescription>A list of all your clients and their contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewClient(client.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditClient(client.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClient(client.id)}
                              className="text-destructive"
                            >
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

      <ClientModal open={modalOpen} onOpenChange={setModalOpen} client={selectedClient} onSave={handleSaveClient} />
    </div>
  )
}
