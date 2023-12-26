import { useState } from 'react'
import './App.css'

function App() {
    const [resumeData, setResumeData] = useState({
      name: '',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setResumeData({ ...resumeData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      return false;
    }

    return (
      <>
        <div className='resume-builder-app'>
          <form onSubmit={handleSubmit}>
            <h1>Resume Builder</h1>
            <div className='resume-element'>
              <label className='resume-input-label'>Name</label>
              <input className='resume-input' type="text" name="name" onChange={handleInputChange}></input>
            </div>
          </form>
          <div className='resume-display'>
            <h1>Resume Contents</h1>
            <div>{resumeData.name}</div>
          </div>
        </div>
      </>
    );
}

export default App
