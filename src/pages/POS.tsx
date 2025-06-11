
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash, Search } from 'lucide-react';
import { Product } from '@/types';

interface CartItem extends Product {
  quantity: number;
}

export const POS = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Produtos mockados
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
      stock_quantity: 80,
      min_stock: 15,
      active: true,
      company_id: '1',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    }
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleProductSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    
    // Se é um código de barras (número), busca automaticamente
    if (/^\d+$/.test(searchValue) && searchValue.length >= 8) {
      const product = mockProducts.find(p => p.barcode === searchValue);
      if (product) {
        addToCart(product);
        setSearchTerm('');
      }
    }
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode?.includes(searchTerm)
  );

  const finalizeSale = () => {
    // Aqui seria integrado com o sistema de pagamento
    alert('Venda finalizada com sucesso!');
    setCart([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Caixa / PDV</h1>
        <p className="text-muted-foreground">
          Ponto de Venda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Área de Produtos */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produto ou código de barras..."
              value={searchTerm}
              onChange={(e) => handleProductSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4" onClick={() => addToCart(product)}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm">{product.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {product.stock_quantity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <Button size="sm" onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Carrinho */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carrinho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Carrinho vazio
                  </p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              R$ {item.price.toFixed(2)} cada
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <span className="font-medium">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <Separator />
                      </div>
                    ))}
                    
                    <div className="pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span>R$ {getTotalPrice().toFixed(2)}</span>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        onClick={finalizeSale}
                        disabled={cart.length === 0}
                      >
                        Finalizar Venda
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
