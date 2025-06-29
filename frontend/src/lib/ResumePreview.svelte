<script lang="ts">
    import { ResumeData } from '../scripts/ResumeData';
    import { writable, type Writable } from 'svelte/store';

    export let data: Writable<ResumeData>;
    $: contactItems = [$data.phone, $data.email, $data.linkedin, $data.github].filter(Boolean);
</script>

<style>
  @import '../styles/ResumePreview.css';
</style>


<main>
    <div class="section-box" id="resume-preview">
        <div id="resume-page">
            <div class="page">
                <!-- Person's Name -->
                <div class='resume-name'>{$data.name}</div>
                <!-- Person's Details -->
                <div class='resume-key-details'>
                    <span>{contactItems.join(' • ')}</span>
                </div>
                <!-- Resume Sections -->
                {#each $data.sections as section}
                <div class="resume-section">
                    <div class="resume-section-title">{section.name.toUpperCase()}</div>
                    <hr>
                </div>
                {/each}
            </div>
        </div>
    </div>
</main>