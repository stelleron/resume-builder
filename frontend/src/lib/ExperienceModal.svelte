<script lang="ts">
    export let open: boolean;
    export let close: () => void;
    export let submit: (title: string, subtitle: string, time_period: string, location: string) => void;

    let title: string;
    let subtitle: string;
    let time_period: string;
    let location: string;
    let bullet_points: string[];

    const handleKeydown = (event: KeyboardEvent) => {
        console.log("ESC pressed", event);
        if (event.key === 'Escape') {
            close();
        }
    };
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
        <input type="text" class="input" bind:value={title}/>

        <legend class="fieldset-legend">Experience Subtitle</legend>
        <input type="text" class="input" bind:value={subtitle}/>

        <legend class="fieldset-legend">Time Period</legend>
        <input type="text" class="input" bind:value={time_period}/>

        <legend class="fieldset-legend">Location</legend>
        <input type="text" class="input" bind:value={location}/>
      </fieldset>

      <div class="modal-action">
        <button class="btn" on:click={() => {submit(title, subtitle, time_period, location); close()}}>Submit</button>
      </div>
    </div>
  </dialog>
{/if}
