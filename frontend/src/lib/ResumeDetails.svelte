<style>
  @import '../styles/App.css';
</style>

<script lang='ts'>
  import { ResumeData, ResumeExperience, ResumeSection } from '../scripts/ResumeData';
  import ExperienceModal from './ExperienceModal.svelte';
  import SectionModal from './SectionModal.svelte';

  import { writable, type Writable } from 'svelte/store';

  export let data: Writable<ResumeData>;

  // For Section
  let secCount = 0;

  let openSecModal : boolean = false;
  const closeSecModal = () => {
      openSecModal = false;
  }

  const addSectionItem = (name: string) => {
    const newItem = new ResumeSection();
    newItem.id = ++secCount;
    newItem.name = name;
    $data.sections.push(newItem); $data.sections = $data.sections;
    $data = $data;
    console.log($data);
  }

  // For Experiences
  let expCount = 0;
  let selectedExp = -1;
  let openExpModal: boolean = false;
  const closeExpModal = () => {
      openExpModal = false;
      selectedExp = -1;
  }

  const addExpItem = (title: string, subtitle: string, time_period: string, location: string, bullet_points: string[]) => {
    for (let i = 0; i < $data.sections.length; i++) {
      if (selectedExp == $data.sections[i].id) {
        const newItem = new ResumeExperience();
        newItem.id = ++expCount;
        newItem.title = title;
        newItem.sub_title = subtitle;
        newItem.time_period = time_period;
        newItem.location = location;
        newItem.bullet_points = bullet_points;
        $data.sections[i].experiences = [...$data.sections[i].experiences, newItem];
        $data = $data;
        console.log($data);
      }
    }
  }

</script>

<main>
  <div class="max-w-xl mx-auto">
    {#each $data.sections as section}
      <div class="collapse bg-base-100 relative border border-gray-500 rounded-sm mb-2">
        <div class="section-bar absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-sm"></div>
        <input type="checkbox" />
        <div class="collapse-title text-xs font-medium py-1 flex items-center">
          {section.name}
        </div>
        <div class="collapse-content">
          {#each section.experiences as exp}
            {#if exp.title != "" && exp.sub_title != ""}
              <div class="relative border border-gray-500 rounded-sm mb-2">{exp.title}, {exp.sub_title}</div>
            {:else if exp.title != "" && exp.sub_title == ""}
              <div class="relative border border-gray-500 rounded-sm mb-2">{exp.title}</div>
            {:else}
              <div class="relative border border-gray-500 rounded-sm mb-2">[{exp.bullet_points[0].slice(0, 10)}...]</div>
            {/if}
          {/each}
          <button on:click={() => {openExpModal = true; selectedExp = section.id}} class="btn btn-primary btn-xs mt-4">Add Resume Experience</button>
        </div>
      </div>
    {/each}
    <button on:click={() => {openSecModal = true}} class="btn btn-primary btn-sm mt-4">Add Resume Section</button>
    <SectionModal open={openSecModal} close={closeSecModal} submit={addSectionItem}></SectionModal>
    <ExperienceModal open={openExpModal} close={closeExpModal} submit={addExpItem}></ExperienceModal>
  </div>
</main>
