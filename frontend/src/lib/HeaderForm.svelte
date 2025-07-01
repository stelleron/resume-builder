<script lang='ts'>
    import ResumeDetails from "../lib/ResumeDetails.svelte";
    import { ResumeData } from '../scripts/ResumeData';

    import { writable, type Writable } from 'svelte/store';

    export let data: Writable<ResumeData>;
</script>

<style>
  @import '../styles/App.css';
</style>

<main>
  <div class="section-box">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4">
      <legend class="fieldset-legend">Resume Details</legend>

      <label class="label">Name</label>
      <input type="text" class="input w-md" placeholder="John Doe" bind:value={$data.name}/>

      <label class="label">Phone Number</label>
      <input type="text" class="input w-md" placeholder="111-111-1111" bind:value={$data.phone} />

      <label class="label">Email</label>
      <input type="text" class="input w-md" placeholder="johndoe@gmail.com" bind:value={$data.email}/>

      <label class="label">LinkedIn</label>
      <input type="text" class="input w-md" placeholder="linkedin.com/johndoe" bind:value={$data.linkedin}/>

      <label class="label">GitHub</label>
      <input type="text" class="input w-md" placeholder="github.com/johndoe" bind:value={$data.github}/>

      <label class="label">Sections</label>
      <ResumeDetails data={data}></ResumeDetails>
    </fieldset>
  </div>
</main>
