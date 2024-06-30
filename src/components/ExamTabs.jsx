"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function ExamTabs({ data }) {
  return (
    <div className="bg-gray-300 border-2 border-green-700 w-full max-w-3xl m-5 p-8 rounded-lg shadow-2xl">
      <TabGroup>
        <TabList className="flex flex-wrap gap-2 justify-center mb-4">
          {Object.keys(data).map((semester) => (
            <Tab
              key={semester}
              className={({ selected }) =>
                `rounded-lg px-4 py-2 text-lg md:text-2xl font-semibold transition 
                ${selected ? "bg-green-400 text-white" : "bg-gray-200 text-gray-800 hover:bg-green-200 hover:text-green-700"}`
              }
            >
              {semester}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {Object.keys(data).map((semester) => (
            <TabPanel key={semester} className="p-4 rounded-lg">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-700">Normal Session</h3>
                <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data[semester].normal.map((course) => (
                    <div
                      className={`rounded-lg p-4 shadow-md transition transform hover:scale-105 ${
                        course.noteExamen >= 10
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                      key={course.id}
                    >
                      <h4 className="font-semibold">{course.mcLibelleFr}</h4>
                      <p className="font-bold text-lg">{course.noteExamen != null ? course.noteExamen : "Null"}</p>
                    </div>
                  ))}
                </div>
              </div>
              {data[semester].rattrappage.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-red-500">Rattrappage Session</h3>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data[semester].rattrappage.map((course) => (
                      <div
                        className={`rounded-lg p-4 shadow-md transition transform hover:scale-105 ${
                          course.noteExamen >= 10
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        }`}
                        key={course.id}
                      >
                        <h4 className="font-semibold">{course.mcLibelleFr}</h4>
                        <p className="font-bold text-lg">{course.noteExamen != null ? course.noteExamen : "Null"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
