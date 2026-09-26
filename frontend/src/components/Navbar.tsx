import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/routes/common/routePath';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    {
      href: ROUTES.STUDENTS,
      label: 'Students',
    },
    {
      href: ROUTES.COURSES,
      label: 'Courses',
    },
    {
      href: ROUTES.TEACHERS,
      label: 'Teachers',
    },
  ];

  return (
    <header className="w-full border-b dark:border-white/25 border-border bg-background px-4 py-3 pb-3 text-foreground lg:px-14">
      <div className="w-full flex h-14 max-w-(--max-width) items-center mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <div className="overflow-x-auto flex flex-row items-center">
            <nav
              aria-label="Main navigation"
              className="hidden md:flex items-center gap-x-2 px-1 py-1"
            >
              {routes?.map((route) => (
                <Button
                  key={route.href}
                  size="sm"
                  variant="ghost"
                  asChild
                  className={cn(
                    `font-normal transition-colors
                    text-muted-foreground
                    hover:bg-accent hover:text-foreground`,
                    pathname === route.href && 'text-accent-foreground'
                  )}
                >
                  <NavLink to={route.href}>{route.label}</NavLink>
                </Button>
              ))}
            </nav>
            <ThemeToggle />
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="inline-flex md:hidden cursor-pointer! bg-accent text-accent-foreground"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background text-foreground">
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-y-2 pt-9"
              >
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    size="sm"
                    variant="ghost"
                    className={cn(
                      `w-full justify-start font-normal text-muted-foreground hover:bg-accent hover:text-accent-foreground`,
                      pathname === route.href &&
                        'bg-accent text-accent-foreground'
                    )}
                    asChild
                  >
                    <NavLink
                      to={route.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={
                        pathname === route.href ? 'page' : undefined
                      }
                    >
                      {route.label}
                    </NavLink>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
