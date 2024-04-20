"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import PDFHandler from "./components/PDFHandler";
import axios from "axios";
import { API_Server_Lessons } from "@/configuration/API";

type Event = any;

export default function Lessons() {
  const [selectedOption, setSelectedOption] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [mediaUrl, setMediaUrl] = useState();
  const [PDFFile, setPDFFile] = useState('')


  console.log(PDFFile)
  const handleOptionChange = (event: Event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextAreaChange = (event: Event) => {
    setTextAreaValue(event.target.value);
  };

  const handleMediaUpload = (event: any) => {
    const file = event.target.files[0];
    // Convert the uploaded file to a URL
    const url: any = URL.createObjectURL(file);
    setPDFFile(event.target.files[0])
    setMediaUrl(url);
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    // Handle form submission here
    
    let body = new FormData();
    if(selectedOption == 'pdf')
      body.append("PDFFile", PDFFile)


    axios.post(`${API_Server_Lessons}`,
      body
    )

  };

  return (
    <div className="col-span-4 row-span-11" >
      <form onSubmit={handleSubmit} className="h-full grid grid-cols-5 grid-rows-12"> 
        <select
          value={selectedOption}
          style={{ color: "black" , gridRowStart:1 , gridColumnStart:1  , width  : 'fit-content' , height : '90%' }}
          onChange={handleOptionChange}
        >
          <option value="">
            Select Option
          </option>
          <option value="pdf">PDF file</option>
          <option value="md">Markdown</option>
          <option value="media">Video</option>
        </select>
        {selectedOption == "" && <h1>Nothing</h1>}

        {selectedOption == "md" && 
          <>
          <textarea
            value={textAreaValue}
            onChange={handleTextAreaChange}
            placeholder="Enter markdown text..."
            rows={5}
            cols={50}
            style={{color:"black",fontSize:18}}
          />
          <div style={{gridRow : 'span 12',
                gridColumn:'span 5'
                ,height:'100%'}}>

<ReactMarkdown >{textAreaValue}</ReactMarkdown>
          </div>
        </>}



        {selectedOption == "pdf" && 
        <PDFHandler handleMediaUpload={handleMediaUpload} mediaUrl={mediaUrl} />
        }
        

        <button type="submit" className="lessonSubmitBtn">Submit</button>
      </form>
    </div>
  );
}
