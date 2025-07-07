<script lang="ts">
  import ResumePreview from "./lib/ResumePreview.svelte";
  import HeaderForm from "./lib/HeaderForm.svelte";
  import Navbar from "./lib/Navbar.svelte"
  
  import { writable, type Writable } from 'svelte/store';
  import { ResumeData } from './scripts/ResumeData';
  import { onMount } from 'svelte';

  let data: Writable<ResumeData> = writable(new ResumeData());

  onMount(async () => {
    const res = await fetch('/api/testdata');
    const resumeData = await res.json();
    if (resumeData?.resume === null) {
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
          userId: parseInt(resumeData.id),
        })
      });
    } else {
      console.log("Has resume!");
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