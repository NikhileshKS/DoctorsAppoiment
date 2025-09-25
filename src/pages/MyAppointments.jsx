// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)

  return (
    <div className="px-4 sm:px-8">
      <p className="pb-3 mt-12 font-medium text-gray-700 border-b text-lg">
        My Appointments
      </p>
      <div>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] sm:flex sm:gap-6 gap-4 py-4 border-b items-center bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Doctor Image */}
            <div>
              <img
                className="w-32 h-32 object-cover rounded-md bg-indigo-50"
                src={item.image}
                alt={`Dr. ${item.name}, ${item.specialty}`}
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-1">
              <p className="text-indigo-700 font-semibold text-lg">{item.name}</p>
              <p className="text-gray-600">{item.specialty}</p>
              <p className="text-sm text-gray-500 font-medium">Address:</p>
              <p className="text-sm text-gray-700">{item.address.line1}</p>
              <p className="text-sm text-gray-700">{item.address.line2}</p>
              <p className="text-sm mt-2">
                <span className="font-semibold text-gray-700">Date & time:</span>{" "}
                25 Sept 2025 | 8:30 AM
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
                Pay Online
              </button>
              <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
