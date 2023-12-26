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
        <h1>Resume Builder</h1>
        <form onSubmit={handleSubmit}>
          <label>Name</label><br></br>
          <input type="text" name="name" onChange={handleInputChange}></input>
        </form>
        <div>
          <h2>Resume Contents</h2>
          <div>{resumeData.name}</div>
        </div>
      </>
    );
}

export default App
