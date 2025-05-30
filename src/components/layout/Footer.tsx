const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ShopWave. All rights reserved.</p>
        <p className="mt-1">Your on-demand shopping destination.</p>
      </div>
    </footer>
  );
};

export default Footer;
