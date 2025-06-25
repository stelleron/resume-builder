<script lang="ts">
    import { ResumeData } from '../scripts/ResumeData';

    export let data: ResumeData;
</script>

<style>
  @import '../styles/ResumePreview.css';
</style>


<main>
    <div class="section-box" id="resume-preview">
        <div id="resume-page">
            <div class="page">
                <div class='resume-name'>{data.name}</div>
            </div>
        </div>
    </div>
</main>