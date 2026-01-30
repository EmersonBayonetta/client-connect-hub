import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Client } from '@/types/client';

interface StatsCardsProps {
  clients: Client[];
  getDaysWithoutContact: (client: Client) => number;
}

export const StatsCards = ({ clients, getDaysWithoutContact }: StatsCardsProps) => {
  const totalClients = clients.length;
  const activeClients = clients.filter(c => 
    c.status !== 'fechado' && c.status !== 'perdido'
  ).length;
  const closedClients = clients.filter(c => c.status === 'fechado').length;
  const overdueClients = clients.filter(c => {
    if (c.status === 'fechado' || c.status === 'perdido') return false;
    return getDaysWithoutContact(c) >= 7;
  }).length;

  const stats = [
    {
      label: 'Total de Clientes',
      value: totalClients,
      icon: Users,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Clientes Ativos',
      value: activeClients,
      icon: Clock,
      color: 'bg-[hsl(var(--status-contact-bg))] text-[hsl(var(--status-contact))]',
    },
    {
      label: 'Vendas Fechadas',
      value: closedClients,
      icon: CheckCircle,
      color: 'bg-[hsl(var(--status-closed-bg))] text-[hsl(var(--status-closed))]',
    },
    {
      label: 'Precisam Follow-up',
      value: overdueClients,
      icon: XCircle,
      color: 'bg-[hsl(var(--danger-bg))] text-[hsl(var(--danger))]',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className="bg-card rounded-xl border border-border p-4 slide-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
