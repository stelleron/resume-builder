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
  let newSection = new ResumeSection();

  let openSecModal : boolean = false;
  const closeSecModal = () => {
      openSecModal = false;
  }

  const addSectionItem = () => {
    newSection.id = ++secCount;
    $data.sections.push(newSection.clone()); $data.sections = $data.sections;
    $data = $data;
    console.log($data);
  }

  const deleteSection = (index: number) => {
      $data.sections.splice(index, 1);
      $data = $data;
      console.log($data);
  }

  const moveSection = (from: number, to: number) => {
    if (to >= 0 && to < $data.sections.length) {
      // Swap
      [$data.sections[from], $data.sections[to]] = [$data.sections[to], $data.sections[from]];
      $data = $data;
    }
  }

  // For Experiences
  let expCount = 0;
  let selectedExp = -1;
  let openExpModal: boolean = false;
  let newExperience = new ResumeExperience();

  const closeExpModal = () => {
      openExpModal = false;
      selectedExp = -1;
  }

  const addExpItem = () => {
    for (let i = 0; i < $data.sections.length; i++) {
      if (selectedExp == $data.sections[i].id) {
        newExperience.id = ++expCount;
        $data.sections[i].experiences = [...$data.sections[i].experiences, newExperience.clone()];
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

  const moveExperience = (id: number, from: number, to: number) => {
    const sectionIndex = $data.sections.findIndex(s => s.id === id);
    if (sectionIndex !== -1) {
      const exps = $data.sections[sectionIndex].experiences;
      if (to >= 0 && to < exps.length) {
        // Swap
        [exps[from], exps[to]] = [exps[to], exps[from]];
        $data = $data;
      }
    }
  }

  const refresh = () => {
    $data = $data;
  }

</script>

<main>
  <div class="max-w-xl mx-auto">
    {#each $data.sections as section, i}
      <div class="collapse bg-base-100 relative border border-gray-500 rounded-sm mb-2">
                <!-- Left color bar -->
        <div class="section-bar absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-sm"></div>
        
        <!-- Section controls -->
        <div class="absolute right-2 top-2 flex items-center gap-2 z-30">
          <!-- Visibility checkbox -->
          <input
            type="checkbox"
            bind:checked={section.visible}
            on:change={() => refresh()}
            class="accent-primary"
            aria-label="Toggle section visibility"
          />

          <!-- Move up button -->
          <button
            on:click={() => moveSection(i, i - 1)}
            class="text-gray-400 hover:text-primary text-xs disabled:opacity-30"
            disabled={i === 0}
            aria-label="Move section up"
          >
            ↑
          </button>

          <!-- Move down button -->
          <button
            on:click={() => moveSection(i, i + 1)}
            class="text-gray-400 hover:text-primary text-xs disabled:opacity-30"
            disabled={i === $data.sections.length - 1}
            aria-label="Move section down"
          >
            ↓
          </button>

          <button 
            aria-label="Edit section"
            on:click={() => {}}
            class="z-30 group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#99a1af"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-3 h-3 transition-colors duration-150 group-hover:stroke-primary"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>


          <!-- Delete section -->
          <button
            on:click={() => deleteSection(i)}
            class="text-gray-400 hover:text-red-500 text-sm"
            aria-label="Delete section"
          >
            &times;
          </button>
        </div>

        <input type="checkbox" />
        <div class="collapse-title text-sm font-medium py-1 flex items-center">
          {section.name}
        </div>
        <div class="collapse-content space-y-2">
          {#each section.experiences as exp, j}
            <div class="relative border border-gray-500 rounded-md pl-3 py-2 pr-6 flex items-center gap-2">
              <!-- Left color bar -->
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-md"></div>

              <!-- Visibility checkbox -->
              <input
                type="checkbox"
                bind:checked={exp.visible}
                on:change={() => refresh()}
                class="accent-primary self-center"
                aria-label="Toggle experience visibility"
              />

              <!-- Content area -->
              <div class="flex-1 space-y-0.5">
                {#if exp.title != "" && exp.sub_title != ""}
                  <div class="text-xs font-semibold">{exp.title}</div>
                  <div class="text-2xs">{exp.sub_title}</div>
                {:else if exp.title != "" && exp.sub_title == ""}
                  <div class="text-xs font-semibold">{exp.title}</div>
                {:else}
                  <div class="text-xs italic">[{exp.bullet_points[0].slice(0, 15)}...]</div>
                {/if}
              </div>


              <!-- Arrow controls -->
              <button
                on:click={() => moveExperience(section.id, j, j - 1)}
                class="text-gray-400 hover:text-primary text-xs disabled:opacity-30"
                disabled={j === 0}
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                on:click={() => moveExperience(section.id, j, j + 1)}
                class="text-gray-400 hover:text-primary text-xs disabled:opacity-30"
                disabled={j === section.experiences.length - 1}
                aria-label="Move down"
              >
                ↓
              </button>

              <button 
                aria-label="Edit experience"
                on:click={() => {}}
                class="z-30 group"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#99a1af"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-3 h-3 transition-colors duration-150 group-hover:stroke-primary"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>

              <!-- Delete button -->
              <button
                on:click={() => deleteExperience(section.id, j)}
                class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-red-500"
                aria-label="Delete"
              >
                &times;
              </button>
            </div>
          {/each}

          <button
            on:click={() => { openExpModal = true; selectedExp = section.id }}
            class="btn btn-primary btn-xs mt-1"
          >
            Add Resume Experience
          </button>
        </div>
      </div>
    {/each}
    <button on:click={() => {openSecModal = true}} class="btn btn-primary btn-sm">Add Resume Section</button>
    <SectionModal open={openSecModal} close={closeSecModal} submit={addSectionItem} section={newSection}></SectionModal>
    <ExperienceModal open={openExpModal} close={closeExpModal} submit={addExpItem} experience={newExperience}></ExperienceModal>
  </div>
</main>
