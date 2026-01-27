"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Locale,
  LOCALE_NAMES,
  routing,
  usePathname,
  useRouter,
} from "@/i18n/routing";
import { useLocaleStore } from "@/stores/localeStore";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const { dismissLanguageAlert } = useLocaleStore();
  const [, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState("locale");

  // ------------------------------------------------------------------
  // ✅ 修复开始：添加 mounted 状态检查，解决 Hydration Mismatch 报错
  // ------------------------------------------------------------------
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // ------------------------------------------------------------------
  // ✅ 修复结束
  // ------------------------------------------------------------------

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  function onSelectChange(nextLocale: Locale) {
    setCurrentLocale(nextLocale);
    dismissLanguageAlert();
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript logic preserved from original code
        { pathname, params: params || {} },
        { locale: nextLocale }
      );
    });
  }

  // ------------------------------------------------------------------
  // ✅ 关键逻辑：如果还在服务端，直接不渲染组件，避免 ID 冲突
  // ------------------------------------------------------------------
  if (!mounted) {
    return null;
  }

  return (
    <Select
      defaultValue={locale}
      value={currentLocale}
      onValueChange={onSelectChange}
    >
      <SelectTrigger className="w-fit">
        <Globe className="w-4 h-4 mr-1" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {LOCALE_NAMES[cur]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}