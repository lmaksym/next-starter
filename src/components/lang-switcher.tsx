'use client'

import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'

type Locale = 'en' | 'pl' | 'de' | 'fr'

const languages: Record<Locale, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇺🇸' },
  pl: { label: 'Polski', flag: '🇵🇱' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  fr: { label: 'Français', flag: '🇫🇷' },
}

export const LangSwitcher = () => {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          disabled={isPending}
          className="cursor-pointer"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(languages) as Locale[]).map(lang => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLocaleChange(lang)}
            className={`cursor-pointer ${locale === lang ? 'bg-accent' : ''}`}
          >
            <span className="mr-2 text-lg">{languages[lang].flag}</span>
            <span>{languages[lang].label}</span>
            {locale === lang && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
