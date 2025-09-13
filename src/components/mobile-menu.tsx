'use client'

import { BookOpen, Github, Globe, Home, Menu, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import type { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  session: Session | null
}

type Locale = 'en' | 'pl' | 'de' | 'fr'

const languages: Record<Locale, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇺🇸' },
  pl: { label: 'Polski', flag: '🇵🇱' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  fr: { label: 'Français', flag: '🇫🇷' },
}

export function MobileMenu({ session }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [expandedLang, setExpandedLang] = useState(false)
  const t = useTranslations('home')
  const { theme, setTheme } = useTheme()
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
      setExpandedLang(false)
    })
  }

  const handleSignIn = () => {
    signIn('github')
    setOpen(false)
  }

  const handleSignOut = () => {
    signOut()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:w-[400px]"
      >
        {/* Header */}
        <div className="p-6 pb-0">
          <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Navigation Section */}
          <div className="px-6 py-6">
            <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
              Navigation
            </h3>
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="https://github.com/lmaksym/next-starter/blob/main/README.md#getting-started"
                target="_blank"
                onClick={() => setOpen(false)}
                className="hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>{t('getStartedButton')}</span>
              </Link>
              <Link
                href="https://github.com/lmaksym/next-starter"
                target="_blank"
                onClick={() => setOpen(false)}
                className="hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
            </nav>
          </div>

          {/* Settings Section */}
          <div className="border-t px-6 py-6">
            <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
              Settings
            </h3>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="hover:bg-accent mb-2 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                {theme === 'light' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span>Theme</span>
              </div>
              <span className="text-muted-foreground text-xs">
                {theme === 'light' ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* Language Selector */}
            <div className="space-y-1">
              <button
                onClick={() => setExpandedLang(!expandedLang)}
                disabled={isPending}
                className="hover:bg-accent flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4" />
                  <span>Language</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{languages[locale].flag}</span>
                  <span className="text-muted-foreground text-xs">
                    {languages[locale].label}
                  </span>
                </div>
              </button>

              {/* Language Options */}
              {expandedLang && (
                <div className="mt-1 ml-7 space-y-1">
                  {(Object.keys(languages) as Locale[]).map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleLocaleChange(lang)}
                      disabled={isPending}
                      className={cn(
                        'hover:bg-accent flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                        locale === lang && 'bg-accent'
                      )}
                    >
                      <span className="text-lg">{languages[lang].flag}</span>
                      <span>{languages[lang].label}</span>
                      {locale === lang && (
                        <span className="ml-auto text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Account Section */}
          <div className="border-t px-6 py-6">
            <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
              Account
            </h3>
            {session ? (
              <div className="space-y-3">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{session.user?.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {session.user?.email}
                  </p>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  {t('signOut')}
                </Button>
              </div>
            ) : (
              <Button onClick={handleSignIn} className="w-full" size="sm">
                {t('signIn')} with GitHub
              </Button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <p className="text-muted-foreground text-center text-xs">
            © {new Date().getFullYear()} Maksym Lypivskyi
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
