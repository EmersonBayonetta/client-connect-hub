import { useState, useMemo } from 'react';
import { Client, ClientStatus } from '@/types/client';
import { useClients } from '@/hooks/useClients';
import { Header } from '@/components/crm/Header';
import { StatsCards } from '@/components/crm/StatsCards';
import { StatusFilter } from '@/components/crm/StatusFilter';
import { ClientCard } from '@/components/crm/ClientCard';
import { ClientForm } from '@/components/crm/ClientForm';
import { DeleteConfirmDialog } from '@/components/crm/DeleteConfirmDialog';
import { EmptyState } from '@/components/crm/EmptyState';
import { toast } from 'sonner';

const Index = () => {
  const {
    clients,
    filteredClients,
    statusFilter,
    setStatusFilter,
    addClient,
    updateClient,
    deleteClient,
    getDaysWithoutContact,
    getOverdueLevel,
  } = useClients(7, 14);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);

  // Calculate client counts for each status
  const clientCounts = useMemo(() => {
    const counts: Record<ClientStatus | 'all', number> = {
      all: clients.length,
      novo: 0,
      em_contato: 0,
      aguardando: 0,
      fechado: 0,
      perdido: 0,
    };

    clients.forEach(client => {
      counts[client.status]++;
    });

    return counts;
  }, [clients]);

  // Sort clients: overdue first, then by last contact
  const sortedClients = useMemo(() => {
    return [...filteredClients].sort((a, b) => {
      const levelA = getOverdueLevel(a);
      const levelB = getOverdueLevel(b);
      
      // Sort by overdue level first (danger > warning > none)
      const levelOrder = { danger: 0, warning: 1, none: 2 };
      if (levelOrder[levelA] !== levelOrder[levelB]) {
        return levelOrder[levelA] - levelOrder[levelB];
      }
      
      // Then by last contact (oldest first for overdue, newest first otherwise)
      const dateA = new Date(a.lastContact).getTime();
      const dateB = new Date(b.lastContact).getTime();
      return dateA - dateB;
    });
  }, [filteredClients, getOverdueLevel]);

  const handleAddClient = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const client = clients.find(c => c.id === id);
    if (client) {
      setDeletingClient(client);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingClient) {
      deleteClient(deletingClient.id);
      toast.success('Cliente excluído com sucesso');
      setDeletingClient(null);
    }
  };

  const handleFormSubmit = (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingClient) {
      updateClient(editingClient.id, data);
      toast.success('Cliente atualizado com sucesso');
    } else {
      addClient(data);
      toast.success('Cliente adicionado com sucesso');
    }
    setIsFormOpen(false);
    setEditingClient(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header clientCount={clients.length} onAddClient={handleAddClient} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-8">
          <StatsCards clients={clients} getDaysWithoutContact={getDaysWithoutContact} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <StatusFilter
            currentFilter={statusFilter}
            onFilterChange={setStatusFilter}
            clientCounts={clientCounts}
          />
        </div>

        {/* Client List */}
        {sortedClients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedClients.map(client => (
              <ClientCard
                key={client.id}
                client={client}
                daysWithoutContact={getDaysWithoutContact(client)}
                overdueLevel={getOverdueLevel(client)}
                onEdit={handleEditClient}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            hasFilter={statusFilter !== 'all'} 
            onAddClient={handleAddClient} 
          />
        )}
      </main>

      {/* Client Form Modal */}
      <ClientForm
        client={editingClient}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={!!deletingClient}
        clientName={deletingClient?.name || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingClient(null)}
      />
    </div>
  );
};

export default Index;
