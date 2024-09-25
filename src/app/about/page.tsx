import { getCount } from "@/utils/counter"
import Image from "next/image"

export const metadata = {
  title: "WebEtu - Blog",
}

const Layout = async () => {
  return (
    <article
      className="rtl p-6 sm:p-10 max-w-4xl mx-auto font-sans text-gray-800"
      dir="rtl"
    >
      <header className="text-center mb-12">
        <div className="flex justify-center items-center mt-6 px-4">
          <Image
            src="/logo-black.svg"
            alt="OSCA Club Logo"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4">
          مرحبًا بكم في WebEtu
        </h1>
        <p className="text-lg text-gray-600 mt-2">جامعة باجي مختار</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-4">
          من نحن؟
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          نحن نادي علمي يتكون من مجموعة من طلاب الإعلام الآلي في جامعة باجي
          مختار بولاية عنابة، يطلق على نادينا إسم مجتمع البرمجيات مفتوحة المصدر،
          حيث نسعى لتعزيز التعاون وتبادل المعرفة في مجال البرمجيات الحرة
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-4">
          ما هو هذا الموقع؟
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          هذا الموقع هو نسخة ويب بديلة غير رسمية من تطبيق WebEtu
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-4">
          ما سبب تطوير هذا الموقع؟
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          هناك سببان رئيسيان يتمثلان في:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed space-y-2">
          <li className="pr-4">
            دعم مختلف المنصات الإلكترونية سواء أجهزة حاسوب أو الهواتف أو أي جهاز
            رقمي أخر به متصفح حديث نوعا ما
          </li>
          <li className="pr-4">
            بعض المشاكل التقنية الموجودة في التطبيق الرسمي الخاص بوزارة التعليم
            العالي والبحث العلمي
          </li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-4">
          عدد المستخدمين منذ أخر تحديث
        </h2>
        <p className="text-lg leading-relaxed text-gray-600 font-bold">
          {getCount()}
        </p>
      </section>

      <footer className="text-center mt-12">
        <p className="font-bold text-lg text-gray-600">
          Telegram:{" "}
          <a
            href="https://t.me/OSCommunityChat"
            className="text-green-600 hover:text-green-700 hover:underline transition duration-200"
          >
            t.me/OSCommunityChat
          </a>
        </p>
        <p className="text-gray-500 text-sm mt-4">
          © 2024 OSCA - All Rights Reserved
        </p>
      </footer>
    </article>
  )
}

export default Layout