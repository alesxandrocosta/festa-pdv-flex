
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Search, Clock } from 'lucide-react';
import { RentalItem } from '@/types';

export const Rental = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mockados para demonstração
  const mockRentalItems: RentalItem[] = [
    {
      id: '1',
      name: 'Mesa Redonda 8 Lugares',
      description: 'Mesa redonda para eventos, comporta 8 pessoas',
      daily_price: 50.00,
      category: 'Mobiliário',
      available_quantity: 15,
      total_quantity: 20,
      company_id: '1',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '2',
      name: 'Cadeira Tiffany Dourada',
      description: 'Cadeira elegante para casamentos e eventos',
      daily_price: 8.00,
      category: 'Mobiliário',
      available_quantity: 80,
      total_quantity: 100,
      company_id: '1',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '3',
      name: 'Taça de Vidro 200ml',
      description: 'Taça de vidro para bebidas',
      daily_price: 2.50,
      category: 'Utensílios',
      available_quantity: 150,
      total_quantity: 200,
      company_id: '1',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '4',
      name: 'Toalha de Mesa 3x1.5m',
      description: 'Toalha de mesa branca para eventos',
      daily_price: 15.00,
      category: 'Decoração',
      available_quantity: 25,
      total_quantity: 30,
      company_id: '1',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '5',
      name: 'Iluminação LED Colorida',
      description: 'Kit de iluminação LED com controle remoto',
      daily_price: 120.00,
      category: 'Iluminação',
      available_quantity: 2,
      total_quantity: 5,
      company_id: '1',
      image_url: '',
      created_at: '2024-01-01'
    },
    {
      id: '6',
      name: 'Caixa de Som Bluetooth',
      description: 'Caixa de som portátil para eventos pequenos',
      daily_price: 80.00,
      category: 'Som',
      available_quantity: 3,
      total_quantity: 8,
      company_id: '1',
      image_url: '',
      created_at: '2024-01-01'
    }
  ];

  const filteredItems = mockRentalItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(mockRentalItems.map(item => item.category)));

  const getAvailabilityBadge = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage === 0) {
      return <Badge variant="destructive">Indisponível</Badge>;
    } else if (percentage < 30) {
      return <Badge variant="secondary">Poucos disponíveis</Badge>;
    } else {
      return <Badge variant="default">Disponível</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Aluguel de Artigos</h1>
          <p className="text-muted-foreground">
            Catálogo de itens para locação em eventos
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Reserva
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar itens ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={searchTerm === '' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSearchTerm('')}
        >
          Todos
        </Button>
        {categories.map((category) => (
          <Button 
            key={category}
            variant={searchTerm === category ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSearchTerm(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
                <Badge variant="outline">{item.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Preço/dia:</span>
                  <span className="text-lg font-bold text-green-600">
                    R$ {item.daily_price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Disponível:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {item.available_quantity}/{item.total_quantity}
                    </span>
                    {getAvailabilityBadge(item.available_quantity, item.total_quantity)}
                  </div>
                </div>

                <div className="flex space-x-2 pt-3">
                  <Button 
                    className="flex-1" 
                    disabled={item.available_quantity === 0}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Reservar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Nenhum item encontrado com os critérios de busca.
          </p>
        </div>
      )}

      {/* Seção de reservas recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Reservas Recentes</CardTitle>
          <CardDescription>
            Últimas reservas de aluguel realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">João Silva - Casamento</p>
                <p className="text-sm text-muted-foreground">
                  20 mesas + 160 cadeiras | 15/12/2024
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">R$ 2.280,00</p>
                <Badge variant="default">Confirmado</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Maria Costa - Aniversário</p>
                <p className="text-sm text-muted-foreground">
                  8 mesas + 64 cadeiras + Som | 22/12/2024
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">R$ 1.152,00</p>
                <Badge variant="secondary">Pendente</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
