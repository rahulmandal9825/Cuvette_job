import { useState } from "react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore } from "../store/authstore";

const JobPost = () => {
  const jonlevel = ["Entry-level", "Intermediate", "Mid-level", "Senior-level"];

  const [candidate, setCandidate] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [jobData, setJobData] = useState({
    JobTitle: "",
    JobDescription: "",
    Experiencelevel: "",
  });

  const {sendInterviewemail} = useAuthStore()

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        setCandidate((prevCandidate) => [...prevCandidate, inputValue]);
        setInputValue(""); // Clear input after adding
      }
    }
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const removecandidate = (nameToRemove) => {
    setCandidate((prevCandidate) =>
      prevCandidate.filter((name) => name !== nameToRemove)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the payload
    const payload = {
      JobTitle: jobData.JobTitle,
      JobDescription: jobData.JobDescription,
      Experiencelevel: jobData.Experiencelevel,
      candidate: candidate,
      lastdate: startDate,
    };
    console.log(payload)

    // Make the API call
    try {
      const response = await sendInterviewemail(payload);

        // Handle success
        console.log("Job post submitted:", response);
        // Optionally, clear the form or show a success message
     
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-[70px] h-full flex">
      <div className="w-full flex justify-center mt-10">
        <form onSubmit={onsubmit} className="flex flex-col text-lg space-y-3 justify-center align-middle">
          <div className="w-[700px] gap-5 flex justify-between">
            <label className="font-semibold self-center w-1/3">Job Title</label>
            <input
              type="text"
              name="JobTitle"
              value={jobData.JobTitle}
              onChange={handleChange}
              placeholder="Enter Job Title"
              className="flex-1 border-[1px] border-gray-300 p-2 bg-white rounded-md"
            />
          </div>
          <div className="w-[700px] gap-5 flex justify-between">
            <label className="font-semibold self-center w-1/3">Job Description</label>
            <textarea
              rows="4"
              name="JobDescription"
              value={jobData.JobDescription}
              onChange={handleChange}
              placeholder="Enter Job Description"
              className="resize-none flex-1 border-[1px] border-gray-300 p-2 bg-white rounded-md"
            />
          </div>
          <div className="w-[700px] gap-5 flex justify-between">
            <label className="font-semibold self-center w-1/3">Job Level</label>
            <select
              name="Experiencelevel"
              value={jobData.Experiencelevel}
              onChange={handleChange}
              className="flex-1 border-[1px] border-gray-300 p-2 bg-white rounded-md"
            >
              <option value="" disabled>
                Select Job Level
              </option>
              {jonlevel.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[700px] gap-5 flex justify-between">
            <label className="font-semibold self-center w-1/3">Add Candidate</label>
            <div className="flex-1 border-[1px] border-gray-300 w-full p-2 bg-white rounded-md h-[100px] overflow-y-auto">
              {candidate.map((name, index) => (
                <div
                  key={index}
                  onClick={() => removecandidate(name)}
                  className="flex main-w-1/2 gap-1 cursor-pointer rounded-lg"
                >
                  <h4 className="text-sm opacity-80 self-center">{name}</h4>
                  {name && <X className="h-3 w-3 self-center" />}
                </div>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Enter Candidate Name and press Enter"
                className="bg-white outline-none mt-2 w-full"
              />
            </div>
          </div>
          <div className="w-[700px] gap-5 flex ">
            <label className="font-semibold self-center w-1/3">End Date</label>
            <DatePicker
              selected={startDate}
              className="bg-white border-[1px] rounded-md p-1 flex-1"
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <button type="sumbit" className="p-1 rounded-lg self-end bg-blue-600 text-white w-1/5">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPost;
