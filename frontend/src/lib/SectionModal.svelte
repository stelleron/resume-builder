<main>
    <dialog id="section_modal" class="modal">
        <div class="modal-box relative">
            <!-- Close icon in top right -->
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            
            <h3 class="text-lg font-bold">Add New Section</h3>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Section Name</legend>
                <input type="text" class="input" placeholder="Section"/>
            </fieldset>
                        
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Submit</button>
                </form>
            </div>
        </div>
    </dialog>
</main>
