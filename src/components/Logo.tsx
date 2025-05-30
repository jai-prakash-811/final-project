import Link from 'next/link';
import { Waves } from 'lucide-react';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors" aria-label="ShopWave Home">
      <Waves className="h-7 w-7" />
      <span>ShopWave</span>
    </Link>
  );
};

export default Logo;
