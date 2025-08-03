<style>
  @import '../../app.css';
</style>

<script lang="ts">
  import { goto } from "$app/navigation";

  let username = '';
  let password = '';
  let unableLogIn = false;

  async function login() {
    const data = new URLSearchParams();
		data.append('username', username);
		data.append('password', password);

    let res = await fetch('/api/login', {
      method: 'POST',
			body: data,
			credentials: 'include', // send cookies for session
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
    });

		if (res.ok) {
      unableLogIn = false;
			goto('/');
		} else {
			unableLogIn = true;
		}
  }
</script>

<div class="flex items-center justify-center h-screen">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">Log In to ResumeGen</legend>

    <label class="label">Email</label>
    <input type="email" class="input" placeholder="Email" bind:value={username}/>

    <label class="label">Password</label>
    <input type="password" class="input" placeholder="Password" bind:value={password}/>

    <div class="">Don't have an account? <a href="/signup" class="text-blue-300">Sign Up</a></div>

    {#if unableLogIn}
      <div class="text-red-700 font-bold">Error: Unable to log in!</div>
    {/if}

    <button class="btn btn-neutral" on:click={() => login()}>Login</button>
  </fieldset>
</div>