"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"

function PanelButtons({ dias, currentYear }: any) {
  const pathname = usePathname()
  const path = pathname.split("/")
  const selectedDia = dias.find((dia: any) => dia.id == path[2])

  return (
    <>
      {selectedDia && (
        <Menu>
          <MenuButton
            className={`rounded px-1 py-2 border hover:bg-gray-50/90 flex-1 md:flex-none max-h-fit flex items-center justify-between text-xs md:text-sm bg-gray-50/90 border-green-500`}
          >
            <span
              className={`text-center m-2 p-1 lg:p-2 border ${currentYear == selectedDia.anneeAcademiqueId ? "text-green-500 border-green-500" : "text-gray-500 border-gray-500"} rounded`}
            >
              {selectedDia.anneeAcademiqueCode}
            </span>
            <span
              className={`text-center m-1 p-1 lg:m-2 lg:p-2 border ${selectedDia.cycleCode == "M" ? "text-purple-500 border-purple-500" : "text-blue-500 border-blue-500"} rounded`}
            >
              {selectedDia.niveauLibelleLongLt}
            </span>
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="w-[var(--button-width)] bg-gray-50 p-2 rounded border [--anchor-gap:4px] sm:[--anchor-gap:8px] space-y-2"
          >
            {dias.map(
              (dia: any, index: number) =>
                dia.id !== selectedDia.id && (
                  <MenuItem key={index}>
                    <Link
                      prefetch={false}
                      href={`/panel/${dia.id}`}
                      key={index}
                      className={`rounded p-1 border hover:border-green-400 bg-blue-50/80 hover:bg-gray-50 flex justify-between text-xs md:text-sm ${path[2] == dia.id && "bg-gray-50/90 border-green-500"}`}
                    >
                      <span
                        className={`text-center m-1 p-1 border text-xs lg:text-sm ${currentYear == dia.anneeAcademiqueId ? "text-green-500 border-green-500" : "text-gray-500 border-gray-500"} rounded`}
                      >
                        {dia.anneeAcademiqueCode}
                      </span>
                      <span
                        className={`text-center m-1 p-1 border ${dia.cycleCode == "M" ? "text-purple-500 border-purple-500" : "text-blue-500 border-blue-500"} rounded`}
                      >
                        {dia.niveauCode}
                      </span>
                    </Link>
                  </MenuItem>
                ),
            )}
          </MenuItems>
        </Menu>
      )}

      <Link
        prefetch={false}
        href={`/panel`}
        className={`rounded px-4 py-4 border border-green-500 text-green-700 hover:bg-gray-50/90 flex items-center text-sm md:text-base gap-2`}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <p className="hidden sm:block">Enrollments</p>
      </Link>
    </>
  )
}

export default PanelButtons
