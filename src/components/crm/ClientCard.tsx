import { Phone, Mail, Package, Calendar, Clock, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Client, STATUS_LABELS, STATUS_CLASSES } from '@/types/client';
import { Button } from '@/components/ui/button';

interface ClientCardProps {
  client: Client;
  daysWithoutContact: number;
  overdueLevel: 'none' | 'warning' | 'danger';
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

export const ClientCard = ({ 
  client, 
  daysWithoutContact, 
  overdueLevel, 
  onEdit, 
  onDelete 
}: ClientCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getOverdueClass = () => {
    if (overdueLevel === 'danger') return 'overdue-danger pulse-warning';
    if (overdueLevel === 'warning') return 'overdue-warning';
    return '';
  };

  return (
    <div 
      className={`
        client-card bg-card rounded-xl border border-border p-5 fade-in
        ${getOverdueClass()}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate">
            {client.name}
          </h3>
          <span className={`status-badge mt-2 ${STATUS_CLASSES[client.status]}`}>
            {STATUS_LABELS[client.status]}
          </span>
        </div>
        
        {/* Overdue Warning */}
        {overdueLevel !== 'none' && (
          <div className={`
            flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
            ${overdueLevel === 'danger' 
              ? 'bg-[hsl(var(--danger-bg))] text-[hsl(var(--danger))]' 
              : 'bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning))]'
            }
          `}>
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{daysWithoutContact} dias</span>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{client.phone || 'Não informado'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{client.email || 'Não informado'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{client.product || 'Não informado'}</span>
        </div>
      </div>

      {/* Notes */}
      {client.notes && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {client.notes}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Último contato: {formatDate(client.lastContact)}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(client)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(client.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
