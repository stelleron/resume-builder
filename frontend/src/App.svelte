<script lang="ts">
  import ResumePreview from "./lib/ResumePreview.svelte";
  import HeaderForm from "./lib/HeaderForm.svelte";
  import Navbar from "./lib/Navbar.svelte"
  
  import { writable, type Writable } from 'svelte/store';
  import { ResumeData } from './scripts/ResumeData';
  import { onMount } from 'svelte';

  let data: Writable<ResumeData> = writable(new ResumeData());

  // Create resume for user if one doesn't exist
  onMount(async () => {
    const user_res = await fetch('/api/testdata');
    const user_data = await user_res.json();
    if (user_data?.resume === null) {
      console.log("Does not have resume! Creating new resume...");
      const resume_res = await fetch('/api/resumedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: "",
          phone: "",
          email: "",
          github: "",
          linkedin: "",
          userId: parseInt(user_data.id),
        })
      });
    } else {
      console.log("Has resume!");
      const resume_res = await fetch('/api/resumedata/1');
      const resume_json = await resume_res.json();
      console.log(resume_json);
      data.set(resume_json);
    }
  });
</script>

<style>
  #resume-cont {
    display: flex;
    justify-content: space-between;
  }
</style>

<Navbar></Navbar>
<div id="resume-cont">
  <HeaderForm bind:data={data}/>
  <ResumePreview data={data}/>
</div>