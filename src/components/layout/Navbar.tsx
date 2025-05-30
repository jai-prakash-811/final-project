'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import UserNav from '@/components/auth/UserNav';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingCart, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Button variant="ghost" asChild>
    <Link href={href} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
      {children}
    </Link>
  </Button>
);

const Navbar = () => {
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const commonNavLinks = (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/products">Products</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {commonNavLinks}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Cart (0 items)">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:block">
            {loading ? (
              <div className="w-20 h-8 bg-muted rounded animate-pulse" /> // Skeleton for UserNav
            ) : (
              <UserNav />
            )}
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-6">
                <div className="flex flex-col gap-6">
                  <Logo />
                  <nav className="flex flex-col gap-4">
                    {React.Children.map(commonNavLinks, child => 
                      React.cloneElement(child as React.ReactElement, { onClick: () => setIsMobileMenuOpen(false) })
                    )}
                  </nav>
                  <div className="mt-auto">
                    {loading ? (
                       <div className="w-full h-10 bg-muted rounded animate-pulse" />
                    ) : (
                       <UserNav mobileMode />
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
