<script lang="ts">
      export let name: string;
</script>

<style>
  @import '../styles/ResumePreview.css';
</style>


<main>
    <div class="section-box" id="resume-preview">
        <div id="resume-page">
            <div class="page">
                <div class='resume-name'>{name}</div>
            </div>
        </div>
    </div>
</main>