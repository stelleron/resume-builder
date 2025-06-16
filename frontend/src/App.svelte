<script lang="ts">
  import { onMount } from 'svelte';

  let message = 'Loading...';

  onMount(async () => {
    try {
      const res = await fetch('/api/hello');
      const data = await res.json();
      message = data.message;
    } catch (err) {
      message = 'Failed to fetch API';
      console.error(err);
    }
  });
</script>

<main>
  <h1>{message}</h1>
</main>
