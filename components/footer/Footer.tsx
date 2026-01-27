import { siteConfig } from "@/config/site";
import { Link as I18nLink } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image"; // 引入 Image 组件渲染 logo

export default async function Footer() {
  const tFooter = await getTranslations("Footer");

  // 定义链接组，方便管理
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Scan Now", href: "/" },
        { name: "Blog", href: "/blog" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        // { name: "Contact", href: "mailto:your@email.com" }, // 以后可以加
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
      ]
    }
  ];

  return (
    <div className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* 上半部分：多列布局区域 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* 第1列：品牌信息 (占大概 1/4) */}
          <div className="col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              {/* 这里使用你的 Logo，如果还没有 svg，可以先用文字代替 */}
              <Image
                src="/logo.svg"
                alt={siteConfig.name}
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Turn your iPhone into a document scanner instantly. <br />
              100% Free. 100% Private.
            </p>
          </div>

          {/* 第2-4列：链接列表 (右侧区域) */}
          {/* 我们用一个嵌套的 grid 来让这三列在右边对齐 */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 md:pl-16">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <I18nLink
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.name}
                      </I18nLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* 下半部分：版权信息 (保持原来的简洁) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {tFooter("Copyright", {
              year: new Date().getFullYear(),
              name: siteConfig.name,
            })}
          </p>

          {/* 这里可以放社交图标，如果不需要就留空 */}
          <div className="flex space-x-4">
            {/* <TwitterIcon ... /> */}
          </div>
        </div>

      </footer>
    </div>
  );
}