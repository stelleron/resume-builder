<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<style global>
  :global(body) {
    font-family: 'Inter', sans-serif;
  }
</style>

<svelte:head>
	<link rel="icon" href={favicon} />
  <title>ResumeGen</title>
</svelte:head>

{@render children?.()}
