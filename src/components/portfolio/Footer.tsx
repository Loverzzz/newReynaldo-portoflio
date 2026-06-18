export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Reynaldo Arya Budi Trisna</p>
          <p>Built with love {'<3'}</p>
        </div>
      </div>
    </footer>
  );
}
