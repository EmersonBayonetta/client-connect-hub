import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  hasFilter: boolean;
  onAddClient: () => void;
}

export const EmptyState = ({ hasFilter, onAddClient }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
        <Users className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {hasFilter ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
      </h3>
      
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {hasFilter 
          ? 'Não há clientes com o status selecionado. Tente outro filtro ou adicione novos clientes.'
          : 'Comece adicionando seu primeiro cliente para organizar seus follow-ups e nunca perder uma oportunidade.'
        }
      </p>
      
      {!hasFilter && (
        <Button onClick={onAddClient} className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Primeiro Cliente
        </Button>
      )}
    </div>
  );
};
