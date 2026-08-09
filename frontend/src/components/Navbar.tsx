import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/routes/common/routePath';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import Logo from '@/components/Logo';

export default function Navbar() {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    {
      href: ROUTES.DASHBOARD,
      label: 'Dashboard',
    },
    {
      href: ROUTES.STUDENTS,
      label: 'Students',
    },
  ];
  return (
    <>
      <header
        className={cn(
          'w-full px-4 py-3 pb-3 lg:px-14 bg-(--secondary-dark-color) text-white',
          pathname === ROUTES.DASHBOARD && 'bg-(--secondary-dark-color)'
        )}
      >
        <div className="w-full flex h-14 max-w-(--max-width) items-center mx-auto">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="inline-flex md:hidden cursor-pointer!
               bg-white/10! text-white! hover:bg-white/10"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <Logo />
            </div>
            <nav className="hidden md:flex items-center gap-x-2 overflow-x-auto">
              {routes?.map((route) => (
                <Button
                  key={route.href}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    `w-full lg:w-auto font-normal py-4.5
                     hover:text-white border-none
                     text-white/60 focus:bg-white/30
                     transition bg-transparent! text-[14.5px]!
                     `,
                    pathname === route.href && 'text-white'
                  )}
                  asChild
                >
                  <NavLink key={route.href} to={route.href}>
                    {route.label}
                  </NavLink>
                </Button>
              ))}
            </nav>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetContent side="left" className="bg-white">
                <nav className="flex flex-col gap-y-2 pt-9">
                  {routes?.map((route) => (
                    <Button
                      key={route.href}
                      size="sm"
                      variant="ghost"
                      className={cn(
                        `w-full font-normal py-4.5
                       hover:bg-white/10 hover:text-black border-none
                       text-black/70 focus:bg-white/30
                       transition bg-transparent! justify-start`,
                        pathname === route.href && 'bg-black/10! text-black'
                      )}
                      asChild
                    >
                      <NavLink to={route.href}>{route.label}</NavLink>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
