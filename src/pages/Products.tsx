
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit } from 'lucide-react';
import { Product } from '@/types';

export const Products = () => {
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
    }
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>
          <p className="text-muted-foreground">
            Gerenciar produtos do catálogo
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou código de barras..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Preço:</span>
                  <span className="text-sm font-bold text-green-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Estoque:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{product.stock_quantity}</span>
                    {product.stock_quantity <= product.min_stock && (
                      <Badge variant="destructive" className="text-xs">
                        Baixo
                      </Badge>
                    )}
                  </div>
                </div>

                {product.barcode && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Código:</span>
                    <span className="text-sm text-muted-foreground">
                      {product.barcode}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={product.active ? "default" : "secondary"}>
                    {product.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Nenhum produto encontrado com os critérios de busca.
          </p>
        </div>
      )}
    </div>
  );
};
