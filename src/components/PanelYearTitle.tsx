"use client"

import { usePathname } from "next/navigation"

function PanelYearTitle({ dias }: any) {
  const pathname = usePathname()
  const path = pathname.split("/")
  const title = dias.find((dia: any) => dia.id == path[2])

  return (
    title && (
      <div className="md:text-lg lg:text-xl font-bold text-center capitalize">
        {title.niveaulibellelonglt} -{" "}
        {title.ofllspecialite ? title.ofllspecialite : title.ofllfiliere}
      </div>
    )
  )
}

export default PanelYearTitle
