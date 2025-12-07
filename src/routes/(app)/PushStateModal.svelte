<script>
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import AddWorkspace from './new/+page.svelte';
	import EditWorkspace from './(workspace)/w/[wid]/edit/+page.svelte';
</script>

{#if page.state.addWorkspaceData}
	<dialog
		id="add-ws-modal"
		class="modal modal-open transition-none"
		transition:fly={{ duration: 200, y: -50 }}
	>
		<div class="modal-box bg-base-200 rounded-md">
			<button
				onclick={() => window.history.back()}
				class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button
			>
			<h3 class="text-lg font-bold">Add a New Workspace</h3>
			<div class="mt-4">
				<AddWorkspace data={page.state.addWorkspaceData} form={null} />
			</div>
		</div>
	</dialog>
{/if}

{#if page.state.editWorkspaceData}
	<dialog
		id="edit-ws-modal"
		class="modal modal-open transition-none"
		transition:fly={{ duration: 200, y: -50 }}
	>
		<div class="modal-box bg-base-200 rounded-md">
			<button
				onclick={() => window.history.back()}
				class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button
			>
			<h3 class="mt-0 mb-0 text-lg font-bold">Edit Workspace: {page.data.workspace?.name}</h3>
			<div class="mt-4">
				<EditWorkspace data={page.state.editWorkspaceData} form={null} />
			</div>
		</div>
	</dialog>
{/if}
