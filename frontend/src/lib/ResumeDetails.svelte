<style>
  @import '../styles/App.css';
</style>

<script lang='ts'>
  import { ResumeSection } from '../scripts/ResumeData';
  import SectionModal from './SectionModal.svelte';

  let items: ResumeSection[] = [];
  let count = 0;

  let openSecModal : boolean = false;
  const closeSecModal = () => {
      openSecModal = false;
  }

  const addItem = (name: string) => {
    const newItem = new ResumeSection();
    newItem.id = ++count;
    newItem.name = name;
    items.push(newItem); items = items;
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
          <button on:click={() => {}} class="btn btn-primary btn-xs mt-4">Add Resume Experience</button>
        </div>
      </div>
    {/each}
    <button on:click={() => {openSecModal = true}} class="btn btn-primary btn-sm mt-4">Add Resume Section</button>
    <SectionModal open={openSecModal} close={closeSecModal} submit={addItem}></SectionModal>
  </div>
</main>
