import React, { useState } from "react";

const MyAppointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelConfirm, setCancelConfirm] = useState(null);
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    service: "",
    professional: "",
    notes: ""
  });

  // Sample appointment data
  const [appointments, setAppointments] = useState({
    upcoming: [
      {
        id: 1,
        date: "2023-06-15",
        time: "10:00 AM",
        service: "General Physician Consultation",
        professional: "Dr. Chirag Deshpande",
        duration: "30 mins",
        status: "confirmed",
        notes: "Regular checkup"
      },
      {
        id: 2,
        date: "2023-06-20",
        time: "2:30 PM",
        service: "Gynecologist Consultation",
        professional: "Dr. Natasha Larson",
        duration: "45 mins",
        status: "confirmed",
        notes: "Annual examination"
      }
    ],
    past: [
      {
        id: 3,
        date: "2023-05-10",
        time: "11:15 AM",
        service: "Dermatologist Consultation",
        professional: "Dr. Siddharth Patel",
        duration: "1 hour",
        status: "completed",
        notes: "Skin allergy follow-up"
      },
      {
        id: 4,
        date: "2023-04-05",
        time: "9:00 AM",
        service: "Pediatric Consultation",
        professional: "Dr. Jameson",
        duration: "2 hours",
        status: "completed",
        notes: "Vaccination and growth check"
      }
    ],
    cancelled: [
      {
        id: 5,
        date: "2023-05-28",
        time: "3:00 PM",
        service: "Neurologist Consultation",
        professional: "Dr. Jennifer Garcia",
        duration: "1.5 hours",
        status: "cancelled",
        notes: "Patient rescheduled"
      }
    ]
  });

  // Available time slots for booking
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
  ];

  // Available services with corresponding professionals
  const services = [
    "General Physician Consultation",
    "Gynecologist Consultation",
    "Dermatologist Consultation",
    "Pediatric Consultation",
    "Neurologist Consultation",
    "Gastroenterologist Consultation"
  ];

  // Professionals by specialty
  const professionalsByService = {
    "General Physician Consultation": [
      "Dr. Chirag Deshpande",
      "Dr. Christopher",
      "Dr. Chloe Evans"
    ],
    "Gynecologist Consultation": [
      "Dr. Natasha Larson",
      "Dr. Sharan",
      "Dr. Ajith"
    ],
    "Dermatologist Consultation": [
      "Dr. Siddharth Patel",
      "Dr. Aira Sharma",
      "Dr. Amekia Hill"
    ],
    "Pediatric Consultation": [
      "Dr. Jameson",
      "Dr. Jeffrey King"
    ],
    "Neurologist Consultation": [
      "Dr. Jennifer Garcia",
      "Dr. Andrew Williams"
    ],
    "Gastroenterologist Consultation": [
      "Dr. Vasundhara Molhotra"
    ]
  };

  // Get professionals based on selected service
  const getProfessionalsForService = (service) => {
    return professionalsByService[service] || [];
  };

  // Handle booking a new appointment
  const handleBookAppointment = (e) => {
    e.preventDefault();
    const newAppt = {
      id: Date.now(),
      date: newAppointment.date,
      time: newAppointment.time,
      service: newAppointment.service,
      professional: newAppointment.professional,
      duration: "30 mins",
      status: "confirmed",
      notes: newAppointment.notes
    };

    setAppointments({
      ...appointments,
      upcoming: [...appointments.upcoming, newAppt]
    });

    setNewAppointment({
      date: "",
      time: "",
      service: "",
      professional: "",
      notes: ""
    });

    setShowBookingModal(false);
  };

  // Handle cancelling an appointment
  const handleCancelAppointment = (id) => {
    const appointment = appointments.upcoming.find(apt => apt.id === id);
    setAppointments({
      ...appointments,
      upcoming: appointments.upcoming.filter(apt => apt.id !== id),
      cancelled: [...appointments.cancelled, { ...appointment, status: "cancelled" }]
    });
    setCancelConfirm(null);
  };

  // Handle rescheduling an appointment
  const handleRescheduleAppointment = (e) => {
    e.preventDefault();
    const updatedAppt = {
      ...rescheduleAppointment,
      date: newAppointment.date || rescheduleAppointment.date,
      time: newAppointment.time || rescheduleAppointment.time
    };

    setAppointments({
      ...appointments,
      upcoming: appointments.upcoming.map(apt =>
        apt.id === rescheduleAppointment.id ? updatedAppt : apt
      )
    });

    setRescheduleAppointment(null);
    setNewAppointment({
      date: "",
      time: "",
      service: "",
      professional: "",
      notes: ""
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch(status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">My Appointments</h2>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                onClick={() => setShowBookingModal(true)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Book New Appointment
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`mr-8 py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "upcoming"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Upcoming
                  <span className="ml-2 bg-indigo-100 text-indigo-600 text-xs font-medium py-0.5 px-2 rounded-full">
                    {appointments.upcoming.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`mr-8 py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "past"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Past
                  <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium py-0.5 px-2 rounded-full">
                    {appointments.past.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("cancelled")}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "cancelled"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Cancelled
                  <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium py-0.5 px-2 rounded-full">
                    {appointments.cancelled.length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
              {appointments[activeTab].length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeTab === "upcoming"
                      ? "Get started by booking a new appointment."
                      : `You don't have any ${activeTab} appointments.`}
                  </p>
                  {activeTab === "upcoming" && (
                    <div className="mt-6">
                      <button
                        onClick={() => setShowBookingModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Book Appointment
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                appointments[activeTab].map(appointment => (
                  <div key={appointment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">{appointment.service}</h3>
                          <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            {formatDate(appointment.date)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {appointment.time} ({appointment.duration})
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            {appointment.professional}
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="mt-2 text-sm text-gray-500">
                            <p>Notes: {appointment.notes}</p>
                          </div>
                        )}
                      </div>
                      {activeTab === "upcoming" && (
                        <div className="mt-4 md:mt-0 flex space-x-2">
                          <button
                            onClick={() => setRescheduleAppointment(appointment)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => setCancelConfirm(appointment.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Book New Appointment Modal */}
      {showBookingModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Book New Appointment
                    </h3>
                    <form onSubmit={handleBookAppointment} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                          Service
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={newAppointment.service}
                          onChange={(e) => {
                            setNewAppointment({ 
                              ...newAppointment, 
                              service: e.target.value,
                              professional: "" // Reset professional when service changes
                            });
                          }}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          required
                        >
                          <option value="">Select a service</option>
                          {services.map(service => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="professional" className="block text-sm font-medium text-gray-700">
                          Professional
                        </label>
                        <select
                          id="professional"
                          name="professional"
                          value={newAppointment.professional}
                          onChange={(e) => setNewAppointment({ ...newAppointment, professional: e.target.value })}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          required
                          disabled={!newAppointment.service}
                        >
                          <option value="">Select a professional</option>
                          {getProfessionalsForService(newAppointment.service).map(professional => (
                            <option key={professional} value={professional}>{professional}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                          Time
                        </label>
                        <select
                          id="time"
                          name="time"
                          value={newAppointment.time}
                          onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          required
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                          Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows="3"
                          value={newAppointment.notes}
                          onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Book Appointment
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowBookingModal(false)}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleAppointment && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Reschedule Appointment
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Current appointment: {rescheduleAppointment.service} with {rescheduleAppointment.professional} on {formatDate(rescheduleAppointment.date)} at {rescheduleAppointment.time}
                      </p>
                    </div>
                    <form onSubmit={handleRescheduleAppointment} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="reschedule-date" className="block text-sm font-medium text-gray-700">
                          New Date
                        </label>
                        <input
                          type="date"
                          id="reschedule-date"
                          name="date"
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="reschedule-time" className="block text-sm font-medium text-gray-700">
                          New Time
                        </label>
                        <select
                          id="reschedule-time"
                          name="time"
                          value={newAppointment.time}
                          onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          required
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Reschedule
                        </button>
                        <button
                          type="button"
                          onClick={() => setRescheduleAppointment(null)}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelConfirm && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m4 4h.01m-6.938 4a2 2 0 001.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Cancel Appointment
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to cancel this appointment? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => handleCancelAppointment(cancelConfirm)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel Appointment
                </button>
                <button
                  onClick={() => setCancelConfirm(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Keep Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;