/**
 * Placeholder types for Supabase integration
 * These should be replaced with actual generated types from Supabase
 */

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string | null
          notes: string | null
          vat_number: string | null
          billing_address: string | null
          billing_city: string | null
          billing_postal_code: string | null
          billing_country: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone?: string | null
          notes?: string | null
          vat_number?: string | null
          billing_address?: string | null
          billing_city?: string | null
          billing_postal_code?: string | null
          billing_country?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string | null
          notes?: string | null
          vat_number?: string | null
          billing_address?: string | null
          billing_city?: string | null
          billing_postal_code?: string | null
          billing_country?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          user_id: string
          title: string
          client_id: string
          status: "pending" | "in_progress" | "completed"
          due_date: string
          description: string | null
          pricing_type: "fixed" | "hourly"
          fixed_price: number | null
          hourly_rate: number | null
          hours_worked: number | null
          vat_inclusive: boolean
          line_items: Array<{
            id: string
            description: string
            quantity: number
            price: number
          }>
          job_address: string | null
          job_city: string | null
          job_postal_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          client_id: string
          status?: "pending" | "in_progress" | "completed"
          due_date: string
          description?: string | null
          pricing_type?: "fixed" | "hourly"
          fixed_price?: number | null
          hourly_rate?: number | null
          hours_worked?: number | null
          vat_inclusive?: boolean
          line_items?: Array<{
            id: string
            description: string
            quantity: number
            price: number
          }>
          job_address?: string | null
          job_city?: string | null
          job_postal_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          client_id?: string
          status?: "pending" | "in_progress" | "completed"
          due_date?: string
          description?: string | null
          pricing_type?: "fixed" | "hourly"
          fixed_price?: number | null
          hourly_rate?: number | null
          hours_worked?: number | null
          vat_inclusive?: boolean
          line_items?: Array<{
            id: string
            description: string
            quantity: number
            price: number
          }>
          job_address?: string | null
          job_city?: string | null
          job_postal_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          user_id: string
          invoice_number: string
          client_id: string
          amount: number
          status: "paid" | "unpaid" | "overdue"
          due_date: string
          line_items: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          invoice_number: string
          client_id: string
          amount: number
          status?: "paid" | "unpaid" | "overdue"
          due_date: string
          line_items?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          invoice_number?: string
          client_id?: string
          amount?: number
          status?: "paid" | "unpaid" | "overdue"
          due_date?: string
          line_items?: any[]
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          business_name: string | null
          vat_number: string | null
          registration_number: string | null
          is_vat_registered: boolean
          address_line1: string | null
          address_line2: string | null
          city: string | null
          postal_code: string | null
          country: string | null
          phone: string | null
          email: string | null
          website: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name?: string | null
          vat_number?: string | null
          registration_number?: string | null
          is_vat_registered?: boolean
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string | null
          vat_number?: string | null
          registration_number?: string | null
          is_vat_registered?: boolean
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          user_id: string
          description: string
          amount: number
          category: string
          expense_date: string
          vendor: string | null
          payment_method: string | null
          reference_number: string | null
          notes: string | null
          receipt_url: string | null
          is_vat_claimable: boolean
          vat_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          description: string
          amount: number
          category: string
          expense_date?: string
          vendor?: string | null
          payment_method?: string | null
          reference_number?: string | null
          notes?: string | null
          receipt_url?: string | null
          is_vat_claimable?: boolean
          vat_amount?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          description?: string
          amount?: number
          category?: string
          expense_date?: string
          vendor?: string | null
          payment_method?: string | null
          reference_number?: string | null
          notes?: string | null
          receipt_url?: string | null
          is_vat_claimable?: boolean
          vat_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      expense_categories: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          color: string | null
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          color?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          color?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export interface User {
  id: string
  email: string
  user_metadata: {
    name?: string
    business_name?: string
  }
  created_at: string
}
