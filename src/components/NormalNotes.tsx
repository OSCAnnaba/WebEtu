interface ModuleNote {
  rattachementMcMcLibelleFr: string
  note: number | null
  apCode: string
}

interface NormalNotesProps {
  normal: ModuleNote[]
}

function getBgColorClass(noteValue: number | null): string {
  if (noteValue == null) {
    return "bg-gray-300/90"
  }
  return noteValue >= 10
    ? "bg-green-200 text-green-800"
    : "bg-red-200 text-red-900"
}

function NormalNotes({ normal }: NormalNotesProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 mb-2">
      {normal.map((note, index) => {
        const { rattachementMcMcLibelleFr, note: noteValue, apCode } = note

        const bgColorClass = getBgColorClass(noteValue)

        return (
          <div
            key={index}
            className={`border border-gray-300 text-gray-800 rounded p-4 lg:p-6 text-xs md:text-sm lg:text-lg flex justify-between items-center w-full transition duration-300 ease-in-out transform hover:scale-103 capitalize ${bgColorClass}`}
          >
            <p className="font-semibold mr-4">{rattachementMcMcLibelleFr}</p>
            <div className="flex gap-4 ml-2">
              <p className="font-bold text-gray-700">
                {noteValue == null ? "N/A" : noteValue}
              </p>
              <p className="font-bold">{apCode}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NormalNotes
