"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import PDFHandler from "./components/PDFHandler";
import axios from "axios";
import { API_Server_Lessons } from "@/configuration/API";
import { ChapterFilter } from "@/components/chapterFilter";
import ErrorModal from "@/components/ErrorModal";

type Event = any;

export default function Lessons() {
  const [selectedOption, setSelectedOption] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [mediaUrl, setMediaUrl] = useState();
  const [PDFFile, setPDFFile] = useState('')
  const [selectedChapter, setselectedChapter] = useState('')
const [onError, setonError] = useState(false)

  const handleOptionChange = (event: Event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextAreaChange = (event: Event) => {
    setTextAreaValue(event.target.value);
  };

  const handleMediaUpload = (event: Event) => {
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
      body.append('Chapter_id',selectedChapter)
      if(!selectedChapter || isNaN(parseInt(selectedChapter))){
        alert('Chapter must be selected');
        return 
    }
      axios.post(`${API_Server_Lessons}`,
      body
    )
    .then((res)=>{
      console.log(res.data)
      alert("Lesson Added Successfuly")
    }).catch(err=>{
      if(err.response.status==500){
        // alert(`File server is down , try again later`);
        setonError(true)
      }
    })

  };

  return (
    <div className="col-span-4 row-span-11" style={{height:'90%'}} >
      <div className="h-10 m-2">
      <ChapterFilter setselectedChapter={setselectedChapter} />


      </div>
      <form onSubmit={handleSubmit} className="h-full grid grid-cols-5 grid-rows-12"> 
        <select
          value={selectedOption}
          style={{ color: "black" , gridRowStart:1 , gridColumnStart:1  , width  : 'fit-content' , height : '45px' , borderRadius:'5px' }}
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
      <ErrorModal modalOpened={onError} setonError={setonError} title={"File server error"} message={"Server is not responding"} />
    </div>
  );
}
