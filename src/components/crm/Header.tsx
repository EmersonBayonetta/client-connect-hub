import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  clientCount: number;
  onAddClient: () => void;
}

export const Header = ({ clientCount, onAddClient }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                FollowUp CRM
              </h1>
              <p className="text-xs text-muted-foreground">
                {clientCount} {clientCount === 1 ? 'cliente' : 'clientes'}
              </p>
            </div>
          </div>

          {/* Add Client Button */}
          <Button onClick={onAddClient} className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Novo Cliente</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
