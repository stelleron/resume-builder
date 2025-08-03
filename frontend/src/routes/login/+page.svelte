<style>
  @import '../../app.css';
</style>

<script lang="ts">
  import { goto } from "$app/navigation";

  let username = '';
  let password = '';

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
			goto('/');
		} else {
			console.error('Login failed');
		}
  }
</script>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend class="fieldset-legend">Log In to ResumeGen</legend>

  <label class="label">Email</label>
  <input type="email" class="input" placeholder="Email" bind:value={username}/>

  <label class="label">Password</label>
  <input type="password" class="input" placeholder="Password" bind:value={password}/>

  <button class="btn btn-neutral mt-4" on:click={() => login()}>Login</button>
</fieldset>