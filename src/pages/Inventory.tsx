
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Product } from '@/types';

export const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mockados para demonstração
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Cerveja Heineken 600ml',
      description: 'Cerveja premium importada',
      price: 25.00,
      cost_price: 18.00,
      barcode: '7891234567890',
      category_id: '1',
      stock_quantity: 150,
      min_stock: 20,
      active: true,
      company_id: '1',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: '2',
      name: 'Hambúrguer Especial',
      description: 'Hambúrguer artesanal 200g',
      price: 30.00,
      cost_price: 15.00,
      barcode: '7891234567891',
      category_id: '2',
      stock_quantity: 50,
      min_stock: 10,
      active: true,
      company_id: '1',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: '3',
      name: 'Refrigerante Coca-Cola 350ml',
      description: 'Refrigerante gelado',
      price: 6.00,
      cost_price: 3.50,
      barcode: '7891234567892',
      category_id: '3',
      stock_quantity: 8,
      min_stock: 15,
      active: true,
      company_id: '1',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: '4',
      name: 'Batata Frita Especial',
      description: 'Porção de batata frita temperada',
      price: 18.00,
      cost_price: 8.00,
      barcode: '7891234567893',
      category_id: '2',
      stock_quantity: 2,
      min_stock: 5,
      active: true,
      company_id: '1',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    }
  ];

  const lowStockProducts = mockProducts.filter(
    product => product.stock_quantity <= product.min_stock
  );

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) {
      return { label: 'Sem Estoque', variant: 'destructive' as const, icon: AlertTriangle };
    } else if (current <= minimum) {
      return { label: 'Estoque Baixo', variant: 'secondary' as const, icon: AlertTriangle };
    } else {
      return { label: 'Em Estoque', variant: 'default' as const, icon: null };
    }
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const stockStatus = getStockStatus(product.stock_quantity, product.min_stock);
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </div>
            <Badge variant={stockStatus.variant}>
              <div className="flex items-center gap-1">
                {stockStatus.icon && <stockStatus.icon className="h-3 w-3" />}
                {stockStatus.label}
              </div>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Estoque Atual:</span>
                <p className="font-medium">{product.stock_quantity}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Estoque Mínimo:</span>
                <p className="font-medium">{product.min_stock}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Preço Custo:</span>
                <p className="font-medium">R$ {product.cost_price.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Preço Venda:</span>
                <p className="font-medium text-green-600">R$ {product.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" className="flex-1" size="sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                Entrada
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <TrendingDown className="h-4 w-4 mr-1" />
                Saída
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Estoque</h1>
          <p className="text-muted-foreground">
            Controle de estoque e movimentações
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Movimentação
        </Button>
      </div>

      {/* Alertas de Estoque Baixo */}
      {lowStockProducts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Atenção: Produtos com Estoque Baixo
            </CardTitle>
            <CardDescription>
              {lowStockProducts.length} produto(s) precisam de reposição
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-2 bg-white rounded border">
                  <span className="font-medium">{product.name}</span>
                  <Badge variant="secondary">
                    {product.stock_quantity} / {product.min_stock}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Todos os Produtos</TabsTrigger>
            <TabsTrigger value="low-stock">Estoque Baixo</TabsTrigger>
            <TabsTrigger value="movements">Movimentações</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="low-stock" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lowStockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimentações Recentes</CardTitle>
              <CardDescription>
                Últimas entradas e saídas de estoque
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Entrada - Cerveja Heineken 600ml</p>
                      <p className="text-sm text-muted-foreground">
                        +50 unidades • há 2 horas
                      </p>
                    </div>
                  </div>
                  <Badge variant="default">Entrada</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Saída - Refrigerante Coca-Cola 350ml</p>
                      <p className="text-sm text-muted-foreground">
                        -12 unidades • há 4 horas
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Saída</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
