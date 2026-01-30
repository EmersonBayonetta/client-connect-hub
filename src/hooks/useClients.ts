import { useState, useEffect, useCallback } from 'react';
import { Client, ClientStatus } from '@/types/client';

const STORAGE_KEY = 'crm_clients';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Load clients from localStorage
const loadClients = (): Client[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading clients:', error);
    return [];
  }
};

// Save clients to localStorage
const saveClients = (clients: Client[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch (error) {
    console.error('Error saving clients:', error);
  }
};

export interface UseClientsReturn {
  clients: Client[];
  filteredClients: Client[];
  statusFilter: ClientStatus | 'all';
  setStatusFilter: (status: ClientStatus | 'all') => void;
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;
  getDaysWithoutContact: (client: Client) => number;
  getOverdueLevel: (client: Client) => 'none' | 'warning' | 'danger';
}

export const useClients = (overdueWarningDays = 7, overdueDangerDays = 14): UseClientsReturn => {
  const [clients, setClients] = useState<Client[]>([]);
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');

  // Load clients on mount
  useEffect(() => {
    setClients(loadClients());
  }, []);

  // Save clients whenever they change
  useEffect(() => {
    if (clients.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      saveClients(clients);
    }
  }, [clients]);

  // Add new client
  const addClient = useCallback((clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newClient: Client = {
      ...clientData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    setClients(prev => [newClient, ...prev]);
  }, []);

  // Update client
  const updateClient = useCallback((id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(client => {
      if (client.id === id) {
        return {
          ...client,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return client;
    }));
  }, []);

  // Delete client
  const deleteClient = useCallback((id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  }, []);

  // Get single client
  const getClient = useCallback((id: string): Client | undefined => {
    return clients.find(client => client.id === id);
  }, [clients]);

  // Calculate days without contact
  const getDaysWithoutContact = useCallback((client: Client): number => {
    const lastContact = new Date(client.lastContact);
    const today = new Date();
    const diffTime = today.getTime() - lastContact.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  // Get overdue level
  const getOverdueLevel = useCallback((client: Client): 'none' | 'warning' | 'danger' => {
    // Don't show overdue for closed or lost clients
    if (client.status === 'fechado' || client.status === 'perdido') {
      return 'none';
    }
    
    const days = getDaysWithoutContact(client);
    if (days >= overdueDangerDays) return 'danger';
    if (days >= overdueWarningDays) return 'warning';
    return 'none';
  }, [getDaysWithoutContact, overdueWarningDays, overdueDangerDays]);

  // Filter clients by status
  const filteredClients = statusFilter === 'all' 
    ? clients 
    : clients.filter(client => client.status === statusFilter);

  return {
    clients,
    filteredClients,
    statusFilter,
    setStatusFilter,
    addClient,
    updateClient,
    deleteClient,
    getClient,
    getDaysWithoutContact,
    getOverdueLevel,
  };
};
