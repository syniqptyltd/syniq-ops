import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg">
              <Image 
                src="/LOGO-light.png" // Image in public folder
                alt="Syniq Ops Logo"
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-foreground">Syniq Ops</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Syniq (Pty) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}