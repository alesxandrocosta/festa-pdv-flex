import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Grid, Calendar, User } from 'lucide-react';

export const Dashboard = () => {
  // Dados mockados para demonstração
  const stats = {
    vendas_hoje: 2450.75,
    pedidos_abertos: 8,
    mesas_ocupadas: 12,
    estoque_baixo: 5
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema PDV
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vendas Hoje
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {stats.vendas_hoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação a ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos Abertos
            </CardTitle>
            <Grid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pedidos_abertos}</div>
            <p className="text-xs text-muted-foreground">
              2 em preparo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mesas Ocupadas
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mesas_ocupadas}/20</div>
            <p className="text-xs text-muted-foreground">
              60% de ocupação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Estoque Baixo
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.estoque_baixo}</div>
            <p className="text-xs text-muted-foreground">
              Produtos com estoque baixo
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>
              Últimas transações realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Mesa 5 - Pedido #1234</p>
                  <p className="text-xs text-muted-foreground">há 5 minutos</p>
                </div>
                <div className="text-sm font-medium">R$ 89,50</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Balcão - Pedido #1233</p>
                  <p className="text-xs text-muted-foreground">há 12 minutos</p>
                </div>
                <div className="text-sm font-medium">R$ 45,00</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Mesa 3 - Pedido #1232</p>
                  <p className="text-xs text-muted-foreground">há 18 minutos</p>
                </div>
                <div className="text-sm font-medium">R$ 156,75</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>
              Top 5 produtos do dia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Cerveja Heineken 600ml</p>
                  <p className="text-xs text-muted-foreground">25 unidades</p>
                </div>
                <div className="text-sm font-medium">R$ 625,00</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Hambúrguer Especial</p>
                  <p className="text-xs text-muted-foreground">18 unidades</p>
                </div>
                <div className="text-sm font-medium">R$ 540,00</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Refrigerante Coca-Cola</p>
                  <p className="text-xs text-muted-foreground">32 unidades</p>
                </div>
                <div className="text-sm font-medium">R$ 192,00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
