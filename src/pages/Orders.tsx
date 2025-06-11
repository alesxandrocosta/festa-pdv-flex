
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '@/types';

export const Orders = () => {
  // Dados mockados para demonstração
  const mockOrders: Order[] = [
    {
      id: '1',
      table_id: '1',
      customer_name: 'Mesa 1',
      status: 'preparing',
      total: 125.50,
      user_id: '1',
      company_id: '1',
      items: [],
      created_at: '2024-06-11T14:30:00Z',
      updated_at: '2024-06-11T14:30:00Z'
    },
    {
      id: '2',
      table_id: '5',
      customer_name: 'Mesa 5',
      status: 'ready',
      total: 89.75,
      user_id: '1',
      company_id: '1',
      items: [],
      created_at: '2024-06-11T14:15:00Z',
      updated_at: '2024-06-11T14:45:00Z'
    },
    {
      id: '3',
      customer_name: 'Cliente Balcão',
      status: 'open',
      total: 45.00,
      user_id: '1',
      company_id: '1',
      items: [],
      created_at: '2024-06-11T15:00:00Z',
      updated_at: '2024-06-11T15:00:00Z'
    },
    {
      id: '4',
      table_id: '3',
      customer_name: 'Mesa 3',
      status: 'completed',
      total: 156.25,
      payment_method: 'Cartão de Crédito',
      user_id: '1',
      company_id: '1',
      items: [],
      created_at: '2024-06-11T13:30:00Z',
      updated_at: '2024-06-11T14:20:00Z'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-4 w-4" />;
      case 'preparing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Aberto';
      case 'preparing':
        return 'Preparando';
      case 'ready':
        return 'Pronto';
      case 'completed':
        return 'Finalizado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'open':
        return 'secondary';
      case 'preparing':
        return 'default';
      case 'ready':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filterOrdersByStatus = (status?: string) => {
    if (!status) return mockOrders;
    return mockOrders.filter(order => order.status === status);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">#{order.id}</CardTitle>
          <Badge variant={getStatusVariant(order.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(order.status)}
              {getStatusText(order.status)}
            </div>
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {order.customer_name} • {formatTime(order.created_at)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total:</span>
            <span className="text-lg font-bold text-green-600">
              R$ {order.total.toFixed(2)}
            </span>
          </div>
          
          {order.payment_method && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pagamento:</span>
              <span className="text-sm">{order.payment_method}</span>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            {order.status === 'open' && (
              <>
                <Button variant="outline" className="flex-1" size="sm">
                  Editar
                </Button>
                <Button className="flex-1" size="sm">
                  Enviar Cozinha
                </Button>
              </>
            )}
            
            {order.status === 'preparing' && (
              <Button className="w-full" size="sm">
                Marcar como Pronto
              </Button>
            )}
            
            {order.status === 'ready' && (
              <Button className="w-full" size="sm">
                Entregar Pedido
              </Button>
            )}
            
            {order.status === 'completed' && (
              <Button variant="outline" className="w-full" size="sm">
                Ver Detalhes
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <p className="text-muted-foreground">
            Gerenciamento de pedidos do restaurante
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="open">Abertos</TabsTrigger>
          <TabsTrigger value="preparing">Preparando</TabsTrigger>
          <TabsTrigger value="ready">Prontos</TabsTrigger>
          <TabsTrigger value="completed">Finalizados</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="open" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterOrdersByStatus('open').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preparing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterOrdersByStatus('preparing').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ready" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterOrdersByStatus('ready').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterOrdersByStatus('completed').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {mockOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Nenhum pedido encontrado.
          </p>
        </div>
      )}
    </div>
  );
};
