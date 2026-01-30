import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  clientName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmDialog = ({ 
  isOpen, 
  clientName, 
  onConfirm, 
  onCancel 
}: DeleteConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Dialog */}
      <div className="relative bg-card rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 fade-in">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Excluir Cliente
          </h3>
          
          {/* Message */}
          <p className="text-muted-foreground mb-6">
            Tem certeza que deseja excluir <strong className="text-foreground">{clientName}</strong>? 
            Esta ação não pode ser desfeita.
          </p>
          
          {/* Actions */}
          <div className="flex items-center gap-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={onConfirm}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
