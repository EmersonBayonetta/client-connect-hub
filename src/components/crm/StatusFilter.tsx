import { ClientStatus, STATUS_LABELS } from '@/types/client';

interface StatusFilterProps {
  currentFilter: ClientStatus | 'all';
  onFilterChange: (status: ClientStatus | 'all') => void;
  clientCounts: Record<ClientStatus | 'all', number>;
}

const FILTER_OPTIONS: (ClientStatus | 'all')[] = [
  'all',
  'novo',
  'em_contato',
  'aguardando',
  'fechado',
  'perdido',
];

export const StatusFilter = ({ currentFilter, onFilterChange, clientCounts }: StatusFilterProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-2 overflow-x-auto scrollbar-thin">
      <div className="flex gap-2 min-w-max">
        {FILTER_OPTIONS.map(status => {
          const isActive = currentFilter === status;
          const count = clientCounts[status];
          const label = status === 'all' ? 'Todos' : STATUS_LABELS[status];
          
          return (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }
              `}
            >
              <span>{label}</span>
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${isActive 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
