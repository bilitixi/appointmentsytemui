import React, { useEffect, useState} from "react";
import axios from "axios";

function ViewDoctors() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function bookAppointment(slotID) {
    try {
        const response = await axios.patch(
            `http://127.0.0.1:8000/appointment_slots/${slotID}/`,
            {
                is_booked: true
            },
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Booked:", response.data);
        alert("Appointment booked successfully!");

        // refresh UI after booking
        fetchData();

        return response.data;

    }
    catch (error) {
        console.error("Error booking slot:", error);
    }
}

    async function fetchData() {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/doctors_with_slots/",
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`
                    }
                }
            );

            setData(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    return (

        <div className="container py-5">

            <h2 className="text-center mb-4">
                Available Doctors in the next 7 days
            </h2>

            <div className="row g-4">

                {data.map((item) => (

                    <div className="col-12" key={item.doctor.id}>

                        <div className="card shadow-sm">

                            <div className="card-body">

                                {/* Doctor Info */}
                                <h5>
                                    Dr. {item.doctor.firstName}{" "}
                                    {item.doctor.lastName}
                                </h5>

                                <p className="text-muted">
                                    {item.doctor.speciality}
                                </p>

                                {/* Slots  */}
                                {item.grouped_slots &&
                                Object.keys(item.grouped_slots).length > 0 ? (

                                    Object.entries(item.grouped_slots).map(
                                        ([date, slots]) => (

                                            <div key={date} className="mb-3">

                                                <h6 className="text-primary">
                                                    {date}
                                                </h6>

                                                <div className="d-flex flex-wrap gap-2">

                                                    {Array.isArray(slots) &&
                                                        slots.map((slot) => (
                                                            <button
                                                                onClick={() => bookAppointment(slot.id)}
                                                                key={slot.id}
                                                                className="btn btn-outline-primary btn-sm"
                                                            >
                                                                {slot.start_time} -{" "}
                                                                {slot.end_time}
                                                            </button>
                                                        ))}

                                                </div>

                                            </div>
                                        )
                                    )

                                ) : (

                                    <p className="text-muted">
                                        No slots available
                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ViewDoctors;