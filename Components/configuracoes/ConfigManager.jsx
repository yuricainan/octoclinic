import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ConfigManager({ Entity, entityName, fields, title, icon: Icon }) {
  const [items, setItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await Entity.list();
    setItems(data);
  };

  const handleOpenForm = (item = null) => {
    setCurrentItem(item);
    setFormData(item || {});
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentItem(null);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      await Entity.update(currentItem.id, formData);
    } else {
      await Entity.create(formData);
    }
    loadItems();
    handleCloseForm();
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja remover este ${entityName}?`)) {
      await Entity.delete(id);
      loadItems();
    }
  };
  
  const getHeader = (field) => field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ');

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          Gerenciar {title}
        </CardTitle>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Novo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentItem ? `Editar ${entityName}` : `Novo ${entityName}`}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              {fields.map(field => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    type={field.type || 'text'}
                    value={formData[field.name] || ''}
                    onChange={e => handleInputChange(field.name, e.target.value)}
                    required
                  />
                </div>
              ))}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseForm}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {fields.map(field => <TableHead key={field.name}>{field.label}</TableHead>)}
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                {fields.map(field => <TableCell key={field.name}>{item[field.name]}</TableCell>)}
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenForm(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}