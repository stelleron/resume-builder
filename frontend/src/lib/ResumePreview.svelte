<script lang="ts">
    import { ResumeData, ResumeSection, ResumeExperience} from '../scripts/ResumeData';
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
            <div id="page">
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
                    {#each section.experiences as exp}
                    <div class="resume-exp">
                        <div class="exp-title">{exp.title} <span class="exp-time">{exp.time_period}</span></div>
                        <div><span class="exp-subtitle">{exp.sub_title}</span> <span class="exp-location">{exp.location}</span></div>
                    </div>
                    {/each}
                </div>
                {/each}
            </div>
        </div>
    </div>
</main>