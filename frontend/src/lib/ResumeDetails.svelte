<style>
  @import '../styles/App.css';
</style>

<script lang='ts'>
  import { ResumeSection } from '../scripts/ResumeData';

  let items: ResumeSection[] = [];
  let count = 0;

  function addItem() {
    const newItem = new ResumeSection();
    newItem.id = ++count;
    newItem.name = "S";
    items.push(newItem); items = items;
    console.log(items);
  }
</script>

<main>
  <div class="max-w-xl mx-auto">
    {#each items as item (item.id)}
      <div class="collapse collapse-arrow bg-base-100">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          {item.name}
        </div>
        <div class="collapse-content">
          <p>Hello</p>
        </div>
      </div>
    {/each}

    <button on:click={addItem} class="btn btn-primary btn-sm mt-4">Add Resume Section</button>
  </div>
</main>