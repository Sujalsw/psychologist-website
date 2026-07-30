const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-gold/10 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-secondary-foreground">
              Dr. Amit Kumar <span className="text-gold">"Ram"</span>
            </h3>
            <p className="text-secondary-foreground/60 text-sm mt-1">
              Psychologist · Healer · Counsellor · Astrologer
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-secondary-foreground/60">
            <a href="#home" className="hover:text-gold transition-colors">Home</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#achievements" className="hover:text-gold transition-colors">Achievements</a>
            <a href="#awards" className="hover:text-gold transition-colors">Awards</a>
            <a href="#awards-gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#media" className="hover:text-gold transition-colors">Media</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
        <div className="border-t border-gold/10 mt-8 pt-6 text-center">
          <p className="text-secondary-foreground/40 text-xs">
            © {new Date().getFullYear()} Dr. Amit Kumar "Ram". All rights reserved. All healing services are complementary in nature.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
