<script lang="ts">
    import { ResumeData, ResumeSection, ResumeExperience} from '../scripts/ResumeData';
    import { writable, type Writable } from 'svelte/store';

    export let data: Writable<ResumeData>;
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
                    <span>{$data.phone}</span>
                    <span>{$data.phone && ($data.email || $data.linkedin || $data.github) ? "•" : ''}</span>
                    <span>{$data.email}</span>
                    <span>{$data.email && ($data.linkedin || $data.github) ? "•" : ''}</span>
                    <span><a class="text-black" href={"https://www." + $data.linkedin}>{$data.linkedin}</a></span>
                    <span>{$data.linkedin && $data.github ? "•" : ''}</span>
                    <span><a class="text-black" href={"https://www." + $data.github}>{$data.github}</a></span>
                </div>
                <!-- Resume Sections -->
                {#each $data.sections as section}
                    {#if section.visible}
                    <div class="resume-section">
                        <div class="resume-section-title">{section.name.toUpperCase()}</div>
                        <hr>
                        {#each section.experiences as exp}
                            {#if exp.visible}
                            <div class="resume-exp">
                                {#if exp.skills_used == ''}
                                    <div class="exp-title">{exp.title}<span class="exp-time">{exp.time_period}</span></div>
                                {:else}
                                    <div class="exp-title">{exp.title} | <span class="exp-skills-used">{exp.skills_used}</span> <span class="exp-time">{exp.time_period}</span></div>
                                {/if}
                                <div><span class="exp-subtitle">{exp.sub_title}</span> <span class="exp-location">{exp.location}</span></div>
                                <ul>
                                {#each exp.bullet_points as bullet_point}
                                    <li><span>{@html bullet_point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</span></li>
                                {/each}
                                </ul>
                            </div>
                            {/if}
                        {/each}
                    </div>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</main>