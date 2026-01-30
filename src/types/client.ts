export type ClientStatus = 'novo' | 'em_contato' | 'aguardando' | 'fechado' | 'perdido';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  product: string;
  status: ClientStatus;
  notes: string;
  lastContact: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export const STATUS_LABELS: Record<ClientStatus, string> = {
  novo: 'Novo',
  em_contato: 'Em Contato',
  aguardando: 'Aguardando Resposta',
  fechado: 'Fechado',
  perdido: 'Perdido',
};

export const STATUS_CLASSES: Record<ClientStatus, string> = {
  novo: 'status-new',
  em_contato: 'status-contact',
  aguardando: 'status-waiting',
  fechado: 'status-closed',
  perdido: 'status-lost',
};
