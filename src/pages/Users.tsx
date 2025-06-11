
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '@/types';

export const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mockados para demonstração
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'alesxandrocosta@gmail.com',
      name: 'Alesxandro Costa',
      role: 'admin_sistema',
      company_id: '1',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      email: 'gerente@empresa.com',
      name: 'João Silva',
      role: 'gerente',
      company_id: '1',
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '3',
      email: 'caixa1@empresa.com',
      name: 'Maria Santos',
      role: 'caixa',
      company_id: '1',
      created_at: '2024-02-01T00:00:00Z',
      updated_at: '2024-02-01T00:00:00Z'
    },
    {
      id: '4',
      email: 'atendente1@empresa.com',
      name: 'Pedro Oliveira',
      role: 'atendente',
      company_id: '1',
      created_at: '2024-02-10T00:00:00Z',
      updated_at: '2024-02-10T00:00:00Z'
    },
    {
      id: '5',
      email: 'supervisor@empresa.com',
      name: 'Ana Costa',
      role: 'supervisor',
      company_id: '1',
      created_at: '2024-02-15T00:00:00Z',
      updated_at: '2024-02-15T00:00:00Z'
    }
  ];

  const getRoleLabel = (role: UserRole): string => {
    const roleLabels: Record<UserRole, string> = {
      'admin_sistema': 'Admin Sistema',
      'admin_empresa': 'Admin Empresa',
      'gerente': 'Gerente',
      'supervisor': 'Supervisor',
      'caixa': 'Caixa',
      'atendente': 'Atendente'
    };
    return roleLabels[role];
  };

  const getRoleVariant = (role: UserRole): "default" | "secondary" | "destructive" => {
    switch (role) {
      case 'admin_sistema':
      case 'admin_empresa':
        return 'destructive';
      case 'gerente':
      case 'supervisor':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRoleLabel(user.role).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            Gerenciamento de usuários do sistema
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, email ou cargo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cargo:</span>
                  <Badge variant={getRoleVariant(user.role)}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cadastrado em:</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(user.created_at)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant="default">Ativo</Badge>
                </div>

                <div className="pt-3 space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    Editar Permissões
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    Resetar Senha
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Nenhum usuário encontrado com os critérios de busca.
          </p>
        </div>
      )}

      {/* Informações sobre Permissões */}
      <Card>
        <CardHeader>
          <CardTitle>Níveis de Permissão</CardTitle>
          <CardDescription>
            Hierarquia de acesso no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Administrador do Sistema</p>
                <p className="text-sm text-muted-foreground">
                  Acesso total, incluindo configurações do sistema
                </p>
              </div>
              <Badge variant="destructive">Nível 6</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Administrador da Empresa</p>
                <p className="text-sm text-muted-foreground">
                  Gerenciamento completo da empresa
                </p>
              </div>
              <Badge variant="destructive">Nível 5</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Gerente</p>
                <p className="text-sm text-muted-foreground">
                  Relatórios, estoque, usuários e configurações gerais
                </p>
              </div>
              <Badge variant="default">Nível 4</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Supervisor</p>
                <p className="text-sm text-muted-foreground">
                  Pedidos, mesas, relatórios básicos
                </p>
              </div>
              <Badge variant="default">Nível 3</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Caixa</p>
                <p className="text-sm text-muted-foreground">
                  PDV, finalização de pedidos, relatórios de venda
                </p>
              </div>
              <Badge variant="secondary">Nível 2</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Atendente</p>
                <p className="text-sm text-muted-foreground">
                  Pedidos, mesas, consulta de produtos
                </p>
              </div>
              <Badge variant="secondary">Nível 1</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
