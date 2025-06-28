<style>
  @import '../styles/App.css';
</style>

<script lang='ts'>
  import { ResumeSection } from '../scripts/ResumeData';
  import ExperienceModal from './ExperienceModal.svelte';
  import SectionModal from './SectionModal.svelte';

  // For Section
  let items: ResumeSection[] = [];
  let secCount = 0;

  let openSecModal : boolean = false;
  const closeSecModal = () => {
      openSecModal = false;
  }

  const addSectionItem = (name: string) => {
    const newItem = new ResumeSection();
    newItem.id = ++secCount;
    newItem.name = name;
    items.push(newItem); items = items;
  }

  // For Experiences
  let expCount = 0;
  let selectedExp = -1;
  let openExpModal: boolean = false;
  const closeExpModal = () => {
      openExpModal = false;
      selectedExp = -1;
  }

  const addExpItem = (name: string) => {

  }

</script>

<main>
  <div class="max-w-xl mx-auto mt-2.5">
    {#each items as item}
      <div class="collapse bg-base-100">
        <input type="checkbox" />
        <div class="collapse-title text-xs font-medium py-1 flex items-center">
          {item.name}
        </div>
        <div class="collapse-content">
          <button on:click={() => {openExpModal = true; selectedExp = item.id}} class="btn btn-primary btn-xs mt-4">Add Resume Experience</button>
        </div>
      </div>
    {/each}
    <button on:click={() => {openSecModal = true}} class="btn btn-primary btn-sm mt-4">Add Resume Section</button>
    <SectionModal open={openSecModal} close={closeSecModal} submit={addSectionItem}></SectionModal>
    <ExperienceModal open={openExpModal} close={closeExpModal} submit={addExpItem}></ExperienceModal>
  </div>
</main>
