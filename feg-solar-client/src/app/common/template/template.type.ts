import { Router } from '@angular/router';
export const sidebarNav = [
  {
    label: 'Dashboard',
    icon: 'pi-chart-line',
    routerLink:['/dashboard'],
  },
  {
    label: 'Projetos',
    icon: 'pi-home',
    routerLink: ['/projetos'],
  },
  {
    label: 'Usuário',
    icon: 'pi-user',
    routerLink: ['/usuario'],
    admin: true,
  },
  // {
  //   label: 'Novo Planejamento',
  //   icon: 'pi-plus',
  //   routerLink: ['/novo-planejamento'],
  // },
  {
    label: 'Secretarias',
    icon: 'pi-sitemap',
    routerLink: ['/secretarias'],
    admin: true,
  },
  {
    label: 'Fluxo',
    icon: 'pi-sort-alt',
    routerLink: ['/fluxo'],
    admin: true,
  },
  // {
  //   label: 'Configurações',
  //   icon: 'pi-cog',
  //   preventExact: true,
  //   items: [
  //     {
  //       label: 'Parâmetros',
  //       // routerLink: ['/recursos-humanos/painel-beneficios/beneficios'],
  //       preventExact: true,
  //     },
  //     {
  //       label: 'Perfil de acesso',
  //       // routerLink: ['/recursos-humanos/painel-beneficios/solicitacoes'],
  //       preventExact: true,
  //     },
  //   ],
  // },
];
