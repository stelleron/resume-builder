<style>
  @import '../styles/App.css';
</style>

<script lang="ts">
    const downloadPage = function() {
      var prtContent = document.getElementById("resume-page");
      if (prtContent == null) {
        console.log("Could not find resume page.");
        return;
      }
      var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      if (WinPrint == null) {
        console.log("Could not open print.");
        return;
      }

      WinPrint.document.write('<html><head><title>Resume</title>');
      WinPrint.document.write('<link rel="stylesheet" href="src/styles/ResumePreview.css" type="text/css" media="print">');
      WinPrint.document.write('</head><body >');
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.write('</body></html>');
      WinPrint.document.close();

      WinPrint.onload = function() {
        if (WinPrint == null) {return;}
        WinPrint.focus(); // Ensure focus before print
        WinPrint.print();
        WinPrint.close();
    };
  }
</script>


<main>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <h1 class="btn btn-ghost text-2xl">Resume Generator</h1>
    </div>
    <div class="flex-none">
      <!-- Download Button with Tooltip -->
      <div class="tooltip tooltip-bottom" data-tip="Download">
        <button class="btn btn-square btn-ghost" on:click={() => downloadPage()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-download" viewBox="0 0 16 16">
            <path
              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path
              d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</main>
