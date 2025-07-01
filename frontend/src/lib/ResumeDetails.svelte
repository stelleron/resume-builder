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

  const deleteExperience = (id: number, index: number) => {
    const section = $data.sections.find(s => s.id === id);
    if (section) {
      section.experiences.splice(index, 1);
      $data = $data;
      console.log($data);
    }
  }

</script>

<main>
  <div class="max-w-xl mx-auto">
    {#each $data.sections as section}
      <div class="collapse bg-base-100 relative border border-gray-500 rounded-sm mb-2">
        <div class="section-bar absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-sm"></div>
        <input type="checkbox" />
        <div class="collapse-title text-sm font-medium py-1 flex items-center">
          {section.name}
        </div>
          <div class="collapse-content space-y-2">
            {#each section.experiences as exp, i}
              {#if exp.title != "" && exp.sub_title != ""}
                <div class="relative border border-gray-500 rounded-md pl-3 py-2 pr-6">
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-md"></div>
                  <button
                    on:click={() => deleteExperience(section.id, i)}
                    class="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-red-500"
                    aria-label="Delete"
                  >
                    &times;
                  </button>
                  <div class="text-xs font-semibold">{exp.title}</div>
                  <div class="text-2xs">{exp.sub_title}</div>
                </div>
              {:else if exp.title != "" && exp.sub_title == ""}
                <div class="relative border border-gray-500 rounded-md pl-3 py-2 pr-6">
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-md"></div>
                  <button
                    on:click={() => deleteExperience(section.id, i)}
                    class="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-red-500"
                    aria-label="Delete"
                  >
                    &times;
                  </button>
                  <div class="text-xs font-semibold">{exp.title}</div>
                </div>
              {:else}
                <div class="relative border border-gray-500 rounded-md pl-3 py-2 pr-6">
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-md"></div>
                  <button
                    on:click={() => deleteExperience(section.id, i)}
                    class="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-red-500"
                    aria-label="Delete"
                  >
                    &times;
                  </button>
                  <div class="text-xs italic">[{exp.bullet_points[0].slice(0, 15)}...]</div>
                </div>
              {/if}
            {/each}
            
            <button
              on:click={() => { openExpModal = true; selectedExp = section.id }}
              class="btn btn-primary btn-xs mt-4"
            >
              Add Resume Experience
            </button>
          </div>
      </div>
    {/each}
    <button on:click={() => {openSecModal = true}} class="btn btn-primary btn-sm">Add Resume Section</button>
    <SectionModal open={openSecModal} close={closeSecModal} submit={addSectionItem}></SectionModal>
    <ExperienceModal open={openExpModal} close={closeExpModal} submit={addExpItem}></ExperienceModal>
  </div>
</main>
