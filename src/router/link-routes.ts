export interface RouteLink {
  name: string;
  title: string;
  path: string;
}

export const routerLink: RouteLink[] = [
  { path: '/', name: 'home', title: 'Home' },
  { path: '/about', name: 'about', title: 'About' },
  { path: '/characters', name: 'characters', title: 'Character' },
];
