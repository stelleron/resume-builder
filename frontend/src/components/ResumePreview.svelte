<script lang="ts">
    import { ResumeData, ResumeSection, ResumeExperience} from '$lib/ResumeData';
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

                <!-- Name -->
                <div class="resume-name">{ $data.name }</div>

                <!-- Contact Line -->
                <div class="resume-key-details">

                    {#if $data.phone}
                        <span>{ $data.phone }</span>
                    {/if}

                    {#if $data.phone && $data.email}
                        <span> | </span>
                    {/if}

                    {#if $data.email}
                        <span>{ $data.email }</span>
                    {/if}

                    {#if ($data.phone || $data.email) && ($data.linkedin || $data.github)}
                        <span> | </span>
                    {/if}

                    {#if $data.linkedin}
                        <span>
                            <a class="text-black" href={"https://" + $data.linkedin}>
                                { $data.linkedin }
                            </a>
                        </span>
                    {/if}

                    {#if $data.linkedin && $data.github}
                        <span> | </span>
                    {/if}

                    {#if $data.github}
                        <span>
                            <a class="text-black" href={"https://" + $data.github}>
                                { $data.github }
                            </a>
                        </span>
                    {/if}

                </div>

                <!-- Resume Sections -->
                {#each $data.sections as section}
                    {#if section.visible}
                        <div class="resume-section">
                            <div class="resume-section-title">
                                { section.name.toUpperCase() }
                            </div>
                            <hr>

                            {#each section.experiences as exp}
                                {#if exp.visible}
                                    <div class="resume-exp">

                                        <!-- Experience Header Line -->
                                        <div class="exp-details">
                                            <div class="exp-left">
                                                <span class="exp-title">{ exp.title }</span>
                                                {#if exp.skills_used}
                                                    <span class="exp-skills-used"> | { exp.skills_used }</span>
                                                {/if}
                                            </div>

                                            <div class="exp-right">
                                                <span class="exp-time">{ exp.time_period }</span>
                                            </div>
                                        </div>

                                        <!-- Subtitle + Location -->
                                        <div class="exp-details">
                                            <div class="exp-left">
                                                {#if exp.sub_title}
                                                    <span class="exp-subtitle">{ exp.sub_title }</span>
                                                {/if}
                                            </div>

                                            <div class="exp-right">
                                                {#if exp.location}
                                                    <span class="exp-location">{ exp.location }</span>
                                                {/if}
                                            </div>
                                        </div>

                                        <!-- Bullet Points -->
                                        <ul>
                                            {#each exp.bullet_points as bp}
                                                <li>
                                                    <span class="exp-bullet-text">
                                                        {@html bp
                                                        .replace(/\r?\n|\r/g, " ")          // remove line breaks
                                                        .replace(/\s+/g, " ")               // collapse extra spaces
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                        }
                                                    </span>
                                                </li>
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
