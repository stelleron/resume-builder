<script lang="ts">
    export let open: boolean;
    export let close: () => void;
    export let submit: (name: string) => void;
    let name: string;

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
        <legend class="fieldset-legend">Experience Name</legend>
        <input type="text" class="input" bind:value={name}/>
    </fieldset>

      <div class="modal-action">
        <button class="btn" on:click={() => {submit(name); close()}}>Submit</button>
      </div>
    </div>
  </dialog>
{/if}
