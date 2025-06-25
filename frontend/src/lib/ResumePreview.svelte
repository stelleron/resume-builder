<script lang="ts">
    import { ResumeData } from '../scripts/ResumeData';

    export let data: ResumeData;
    $: contactItems = [data.phone, data.email, data.linkedin, data.github].filter(Boolean);
</script>

<style>
  @import '../styles/ResumePreview.css';
</style>


<main>
    <div class="section-box" id="resume-preview">
        <div id="resume-page">
            <div class="page">
                <div class='resume-name'>{data.name}</div>
                <div class='resume-key-details'>
                    <span>{contactItems.join(' • ')}</span>
                </div>
            </div>
        </div>
    </div>
</main>