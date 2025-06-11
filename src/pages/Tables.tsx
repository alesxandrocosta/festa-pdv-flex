
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table } from '@/types';
import { Calendar, User, Clock } from 'lucide-react';

export const Tables = () => {
  // Dados mockados para demonstração
  const mockTables: Table[] = [
    {
      id: '1',
      number: 1,
      capacity: 4,
      status: 'occupied',
      current_order_id: 'order-1',
      company_id: '1',
      created_at: '2024-01-01'
    },
    {
      id: '2',
      number: 2,
      capacity: 2,
      status: 'available',
      company_id: '1',
      created_at: '2024-01-01'
    },
    {
      id: '3',
      number: 3,
      capacity: 6,
      status: 'reserved',
      company_id: '1',
      created_at: '2024-01-01'
    },
    {
      id: '4',
      number: 4,
      capacity: 4,
      status: 'cleaning',
      company_id: '1',
      created_at: '2024-01-01'
    },
    {
      id: '5',
      number: 5,
      capacity: 8,
      status: 'occupied',
      current_order_id: 'order-2',
      company_id: '1',
      created_at: '2024-01-01'
    },
    {
      id: '6',
      number: 6,
      capacity: 2,
      status: 'available',
      company_id: '1',
      created_at: '2024-01-01'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-yellow-500';
      case 'cleaning':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'occupied':
        return 'Ocupada';
      case 'reserved':
        return 'Reservada';
      case 'cleaning':
        return 'Limpeza';
      default:
        return 'Desconhecido';
    }
  };

  const getActionButton = (table: Table) => {
    switch (table.status) {
      case 'available':
        return (
          <div className="space-y-2">
            <Button className="w-full" size="sm">
              Ocupar Mesa
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              Reservar
            </Button>
          </div>
        );
      case 'occupied':
        return (
          <div className="space-y-2">
            <Button variant="destructive" className="w-full" size="sm">
              Fechar Conta
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              Ver Pedido
            </Button>
          </div>
        );
      case 'reserved':
        return (
          <div className="space-y-2">
            <Button className="w-full" size="sm">
              Confirmar Chegada
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              Cancelar Reserva
            </Button>
          </div>
        );
      case 'cleaning':
        return (
          <Button className="w-full" size="sm">
            Concluir Limpeza
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mesas</h1>
        <p className="text-muted-foreground">
          Gerenciamento de mesas do restaurante
        </p>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm">Disponível</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm">Ocupada</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm">Reservada</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm">Limpeza</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockTables.map((table) => (
          <Card key={table.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Mesa {table.number}</CardTitle>
                <div 
                  className={`w-4 h-4 rounded-full ${getStatusColor(table.status)}`}
                ></div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{table.capacity} lugares</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge 
                  variant={table.status === 'available' ? 'default' : 'secondary'}
                  className="w-full justify-center"
                >
                  {getStatusText(table.status)}
                </Badge>

                {table.status === 'occupied' && table.current_order_id && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Pedido desde 14:30</span>
                  </div>
                )}

                {table.status === 'reserved' && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Reservado para 19:00</span>
                  </div>
                )}

                {getActionButton(table)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
