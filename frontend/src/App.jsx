import { useState } from 'react'
import "./App.css"

function ResumeBuilder() {
  return (
    <div class="section-box" id="resume-builder">
      <h1>Build-a-Resume: Your goto for building and customizing resumes!</h1>
      <form>
        <label>Name </label>
        <input type="text"></input><br></br>

        <label>Phone Number </label>
        <input type="text"></input><br></br>
        
        <label>E-Mail </label>
        <input type="text"></input><br></br>

        <label>LinkedIn </label>
        <input type="text"></input><br></br>

        <label>GitHub </label>
        <input type="text"></input><br></br>
      </form>
    </div>
  )
}

function ResumePreview() {
  return (
    <div class="section-box" id="resume-preview">
      <h1>Resume Preview</h1>
    </div>
  )
}

function App() {
  return (
      <div id="resume-cont">
        <ResumeBuilder/>
        <ResumePreview/>
      </div>
  )
}

export default App