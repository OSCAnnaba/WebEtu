"use client"

interface Module {
  id: number
  mcLibelleFr: string
  noteExamen: number | null
}

interface ExamNotesProps {
  item: {
    normal: Module[]
    rattrappage: Module[]
  }
}

const headerStyle =
  "text-l md:text-2xl font-extrabold text-center text-gray-600 mb-4"
const itemDivStyle =
  "grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 capitalize text-xs md:text-sm lg:text-lg"
const moduleDivStyle =
  "rounded p-4 lg:p-6 transition transform flex border border-gray-300 hover:scale-103"

function getNoteClass(note: number | null) {
  if (note === null) return "bg-gray-300/90 text-gray-800"
  return note >= 10 ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
}

function ModuleCard({ module }: { module: Module }) {
  return (
    <div
      className={`${moduleDivStyle} ${getNoteClass(module.noteExamen)}`}
      key={module.id}
    >
      <h4 className="font-semibold flex-1">{module.mcLibelleFr}</h4>
      <p className="font-bold ml-2 text-gray-700">
        {module.noteExamen !== null && module.noteExamen !== undefined
          ? module.noteExamen
          : "N/A"}
      </p>
    </div>
  )
}

function ExamNotes({ item }: ExamNotesProps) {
  return (
    <>
      <div className="mb-2">
        <h3 className={headerStyle}>Normal Session</h3>
        <div className={itemDivStyle}>
          {item.normal.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      {item.rattrappage.length > 0 && (
        <div className="mb-2">
          <h3 className={`${headerStyle} mt-4`}>Rattrapage Session</h3>
          <div className={itemDivStyle}>
            {item.rattrappage.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ExamNotes
