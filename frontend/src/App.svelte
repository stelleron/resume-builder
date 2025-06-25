<script lang="ts">
  import ResumePreview from "./lib/ResumePreview.svelte";
  import HeaderForm from "./lib/HeaderForm.svelte";
  import Navbar from "./lib/Navbar.svelte"

  import { ResumeData } from './scripts/ResumeData';

  let data: ResumeData = new ResumeData();
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