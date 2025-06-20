<script lang="ts">
  import ResumePreview from "./lib/ResumePreview.svelte";
  import HeaderForm from "./lib/HeaderForm.svelte";
  import Navbar from "./lib/Navbar.svelte"
</script>

<style>
  #resume-cont {
    display: flex;
    justify-content: space-between;
  }
</style>

<Navbar></Navbar>
<div id="resume-cont">
  <HeaderForm/>
  <ResumePreview/>
</div>