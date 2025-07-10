<script lang="ts">
    import type { ResumeExperience } from "../scripts/ResumeData";

    export let open: boolean;
    export let close: () => void;
    export let submit: () => void;
    export let experience : ResumeExperience;

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            close();
        }
    };

    const addBulletPoint = () => {
      experience.bullet_points = [...experience.bullet_points, ""];
      console.log(experience.bullet_points);
    }
</script>

{#if open}
  <dialog open class="modal" on:keydown={handleKeydown} tabindex="0">
    <div class="modal-box relative">
      <!-- close "X" button -->
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        on:click={close}
      >
        ✕
      </button>

      <h3 class="text-lg font-bold">Add New Experience</h3>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Experience Title</legend>
        <input type="text" class="input" bind:value={experience.title}/>

        <legend class="fieldset-legend">Experience Subtitle</legend>
        <input type="text" class="input" bind:value={experience.sub_title}/>

        <legend class="fieldset-legend">Skills Used</legend>
        <input type="text" class="input" bind:value={experience.skills_used}/>

        <legend class="fieldset-legend">Time Period</legend>
        <input type="text" class="input" bind:value={experience.time_period}/>

        <legend class="fieldset-legend">Location</legend>
        <input type="text" class="input" bind:value={experience.location}/>
        
        {#each experience.bullet_points as bullet, i}
          <div>
            <div class="flex items-center">
              <legend class="fieldset-legend mb-0">Bullet Point {i + 1}</legend>
              <button class="btn btn-xs btn-error ml-1" on:click={() => {experience.bullet_points.splice(i, 1); experience.bullet_points = experience.bullet_points}}>Delete</button>
            </div>
            <textarea
              class="textarea font-sans"
              placeholder="Add bullet point here..."
              bind:value={experience.bullet_points[i]}
            ></textarea>
          </div>
        {/each}

        <button class="btn btn-primary btn-sm mt-4 w-1/4" on:click={() => addBulletPoint()}>Add Bullet Point</button>
      </fieldset>

      <div class="modal-action">
        <button class="btn" on:click={() => {submit(); close()}}>Submit</button>
      </div>
    </div>
  </dialog>
{/if}
