<style>
  @import '../../app.css';
</style>

<script lang="ts">
  import { userId } from '../../lib/UserId';
  import { goto } from "$app/navigation";

  let username = '';
  let password = '';
  let signInError = false;

  async function signup() {
    let res = await fetch('/api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })

    if (res.ok) {
      signInError = false;
      let buf = await res.json();
      userId.set(buf.id);
			goto('/');
		} else {
      userId.set(null);
      signInError = true;
		}
  }
</script>

<div class="flex items-center justify-center h-screen">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">Sign Up to ResumeGen</legend>

    <label class="label">Username</label>
    <input type="username" class="input" placeholder="username" bind:value={username}/>

    <label class="label">Password</label>
    <input type="password" class="input" placeholder="Password" bind:value={password}/>

    {#if signInError}
      <div class="text-red-700 font-bold">Error: Unable to sign up!</div>
    {/if}

    <button class="btn btn-neutral" on:click={() => signup()}>Sign Up</button>
  </fieldset>
</div>