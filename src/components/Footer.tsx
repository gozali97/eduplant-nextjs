export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; 2025 Media Pembelajaran Interaktif. Dibuat oleh Tim Pengembang.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Versi 1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
