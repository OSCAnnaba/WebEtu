"use client"

import { useState } from "react"
import { BanknotesIcon, MapIcon, PencilIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

function Enrollments({ dias, currentYear }: any) {
  const [open, setOpen] = useState(currentYear)

  return (
    <>
      {dias.map((dia: any, index: number) => (
        <div
          key={index}
          className={`rounded p-4 border border-gray-300 hover:bg-gray-50/90 capitalize transition-colors duration-300 ${
            open == dia.anneeAcademiqueId
              ? "bg-gray-50/90 border-green-500"
              : ""
          }`}
        >
          <div
            onClick={() => setOpen(dia.anneeAcademiqueId)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row text-xs sm:text-sm">
              <span
                className={`text-center m-1 p-2 border ${
                  currentYear == dia.anneeAcademiqueId
                    ? "text-green-500 border-green-500"
                    : "text-gray-500 border-gray-500"
                } rounded-md`}
              >
                {dia.anneeAcademiqueCode}
              </span>
              <span
                className={`text-center m-1 p-2 border ${
                  dia.cycleCode == "M"
                    ? "text-purple-500 border-purple-500"
                    : "text-blue-500 border-blue-500"
                } rounded-md`}
              >
                {dia.niveauCode}
              </span>
            </div>
            <span className="flex-1 text-sm sm:text-base lg:text-lg font-bold text-left truncate">
              {dia.ofLlSpecialite ? dia.ofLlSpecialite : dia.ofLlFiliere}
            </span>
          </div>

          {open == dia.anneeAcademiqueId && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-xs sm:text-sm">
              <div className="flex flex-col gap-2 text-left">
                <label className="font-bold">Institution:</label>
                <span className="bg-gray-200 p-4 rounded">
                  {dia.llEtablissementLatin}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label className="font-bold">Domain:</label>
                <span className="bg-gray-200 p-4 rounded">
                  {dia.ofLlDomaine}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label className="font-bold">Field:</label>
                <span className="bg-gray-200 p-4 rounded">
                  {dia.ofLlFiliere}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label className="font-bold">Level:</label>
                <span className="bg-gray-200 p-4 rounded">
                  {dia.niveauLibelleLongLt}
                </span>
              </div>
              {dia.ofLlSpecialite && (
                <div className="flex flex-col gap-2 text-left">
                  <label className="font-bold">Speciality:</label>
                  <span className="bg-gray-200 p-4 rounded">
                    {dia.ofLlSpecialite}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center p-4 md:col-span-2">
                <div className="flex gap-2 text-left">
                  <span className="group relative">
                    <BanknotesIcon
                      className={`w-6 h-6 lg:w-8 lg:h-8 ${
                        dia.fraisInscriptionPaye
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                    <div className="hidden group-hover:block absolute min-w-fit p-2 bg-gray-200 rounded text-xs">
                      Inscription Fees{" "}
                      {dia.fraisInscriptionPaye ? "Paid" : "Not Paid"}
                    </div>
                  </span>
                  <span className="group relative">
                    <MapIcon
                      className={`w-6 h-6 lg:w-8 lg:h-8 ${
                        dia.transportPaye ? "text-yellow-500" : "text-gray-400"
                      }`}
                    />
                    <div className="hidden group-hover:block absolute min-w-fit p-2 bg-gray-200 rounded text-xs">
                      Transport Fees {dia.transportPaye ? "Paid" : "Not Paid"}
                    </div>
                  </span>
                </div>
                <Link
                  href={`/panel/${dia.id}`}
                  className="flex items-center p-2 gap-2 bg-green-600 text-white rounded font-bold transition duration-300 ease-in-out transform hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                  aria-label="Check Grades"
                >
                  <PencilIcon
                    className="w-4 h-4 lg:w-6 lg:h-6"
                    aria-hidden="true"
                  />
                  <span>Check Grades</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default Enrollments
