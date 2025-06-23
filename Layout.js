import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Notificacao } from "@/entities/Notificacao";
import {
  LayoutDashboard,
  Users,
  Calendar,
  AlertTriangle,
  FileText,
  Bell,
  Settings,
  Menu,
  X,
  Stethoscope,
  Activity,
  Clock,
  UserCheck
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
    description: "Visão geral e indicadores"
  },
  {
    title: "Funcionários",
    url: createPageUrl("Funcionarios"),
    icon: Users,
    description: "Gestão da equipe"
  },
  {
    title: "Escalas",
    url: createPageUrl("Escalas"),
    icon: Calendar,
    description: "Calendário de plantões"
  },
  {
    title: "Registros",
    url: createPageUrl("Registros"),
    icon: Clock,
    description: "Faltas e trocas"
  },
  {
    title: "Ocorrências",
    url: createPageUrl("Ocorrencias"),
    icon: AlertTriangle,
    description: "Incidents e eventos"
  },
  {
    title: "Relatórios",
    url: createPageUrl("Relatorios"),
    icon: FileText,
    description: "Análises e exportações"
  },
  {
    title: "Configurações",
    url: createPageUrl("Configuracoes"),
    icon: Settings,
    description: "Gerenciar sistema"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadUser();
    loadNotificacoes();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  };

  const loadNotificacoes = async () => {
    try {
      const userData = await User.me();
      const notifs = await Notificacao.filter({
        destinatario_id: userData.id
      }, "-created_date", 10);
      setNotificacoes(notifs);
      setNotificacoesNaoLidas(notifs.filter(n => !n.lida).length);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
    }
  };

  const marcarComoLida = async (notificacaoId) => {
    try {
      await Notificacao.update(notificacaoId, {
        lida: true,
        data_leitura: new Date().toISOString()
      });
      loadNotificacoes();
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  const isGestor = user?.role === 'admin' || user?.perfil === 'gestor';

  const SidebarContent = () => (
    <>
      <div className="border-b border-slate-200/60 p-4 lg:p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-4 lg:w-6 h-4 lg:h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-base lg:text-lg text-slate-900">UTI Manager</h2>
            <p className="text-xs text-slate-500 font-medium">Sistema de Gestão Hospitalar</p>
          </div>
        </div>
      </div>
      
      <div className="p-2 lg:p-3 flex-1">
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
            Navegação Principal
          </div>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-1 flex items-center gap-3 px-4 py-3 ${
                  location.pathname === item.url 
                    ? 'bg-blue-50 text-blue-700 shadow-sm' 
                    : 'text-slate-600'
                }`}
              >
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm lg:text-base">{item.title}</span>
                  <p className="text-xs text-slate-400 mt-0.5 hidden lg:block">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
            Status da UTI
          </div>
          <div className="px-4 py-2 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-600">Sistema Operacional</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-slate-600">Plantões Ativos</span>
              <Badge variant="secondary" className="ml-auto">12</Badge>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <UserCheck className="w-4 h-4 text-green-500" />
              <span className="text-slate-600">Equipe Online</span>
              <Badge variant="secondary" className="ml-auto">8</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/60 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-700 font-semibold text-sm">
              {user?.full_name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-900 text-sm truncate">
              {user?.full_name || 'Usuário'}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {isGestor ? 'Gestor' : 'Técnico'}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => User.logout()}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <style>
        {`
          :root {
            --hospital-primary: #0ea5e9;
            --hospital-secondary: #10b981;
            --hospital-accent: #f59e0b;
            --hospital-danger: #ef4444;
            --hospital-text: #1e293b;
            --hospital-muted: #64748b;
            --hospital-bg: #f8fafc;
            --hospital-card: #ffffff;
          }
          
          @media (max-width: 768px) {
            .mobile-scroll {
              -webkit-overflow-scrolling: touch;
            }
          }
        `}
      </style>
      
      {/* Mobile Header */}
      <header className="lg:hidden bg-white/90 backdrop-blur-sm border-b border-slate-200/60 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-lg">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 bg-white/95 backdrop-blur-sm">
                <div className="h-full flex flex-col">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              <h1 className="text-lg font-bold text-slate-900">UTI Manager</h1>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notificacoesNaoLidas > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500">
                    {notificacoesNaoLidas}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-semibold">Notificações</h3>
              </div>
              <div className="max-h-96 overflow-y-auto mobile-scroll">
                {notificacoes.slice(0, 5).map((notif) => (
                  <DropdownMenuItem 
                    key={notif.id}
                    className="p-3 cursor-pointer"
                    onClick={() => marcarComoLida(notif.id)}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{notif.titulo}</span>
                        {!notif.lida && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{notif.mensagem}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1">
        <SidebarProvider>
          <div className="flex w-full">
            <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-sm">
              <SidebarContent />
            </Sidebar>

            <main className="flex-1 flex flex-col">
              <div className="flex-1 overflow-auto mobile-scroll">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>

      {/* Mobile Content */}
      <main className="lg:hidden flex-1 overflow-auto mobile-scroll">
        {children}
      </main>
    </div>
  );
}
