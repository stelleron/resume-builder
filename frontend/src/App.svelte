<script lang="ts">
  import ResumePreview from "./lib/ResumePreview.svelte";
  import HeaderForm from "./lib/HeaderForm.svelte";
</script>

<style>
  #resume-cont {
    display: flex;
    justify-content: space-between;
  }
</style>

<div id="resume-cont">
  <HeaderForm/>
  <ResumePreview/>
</div>