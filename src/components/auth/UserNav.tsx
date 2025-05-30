'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { LogOut, User as UserIcon, LogIn, UserPlus } from 'lucide-react';

interface UserNavProps {
  mobileMode?: boolean;
}

const UserNav = ({ mobileMode = false }: UserNavProps) => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className={`h-10 ${mobileMode ? 'w-full' : 'w-28'} bg-muted rounded-md animate-pulse`} />;
  }

  if (!user) {
    if (mobileMode) {
      return (
        <div className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login"><LogIn className="mr-2 h-4 w-4" />Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup"><UserPlus className="mr-2 h-4 w-4" />Sign Up</Link>
        </Button>
      </div>
    );
  }

  const userInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U');

  if (mobileMode) {
    return (
      <div className="flex flex-col gap-2">
         <Button variant="ghost" className="justify-start w-full">
            <UserIcon className="mr-2 h-4 w-4" /> Profile (Soon)
          </Button>
        <Button variant="destructive" onClick={logout} className="justify-start w-full">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9">
            {/* Add user.photoURL if available */}
            <AvatarImage src={user.displayName || "/placeholder-user.jpg"} alt={user.displayName || user.email || "User"} data-ai-hint="person avatar" /> 
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile (Soon)</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
