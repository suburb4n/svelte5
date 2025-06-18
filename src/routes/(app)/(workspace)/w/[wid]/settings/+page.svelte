<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let isDeleting = $state(false);
</script>

<h3>Settings</h3>
<!-- TODO: Check if user can update a workspace -->
<a class="btn" href="/w/{data.workspace.id}/edit"> Edit Workspace</a>

<!-- TODO: Check if user can delete a workspace -->
<form
	action="/w/{data.workspace.id}?/deleteWorkspace"
	method="POST"
	use:enhance={() => {
		isDeleting = true;
		return ({ result }) => {
			if (result.type === 'redirect') {
				toast.success('Workspace Deleted');
				applyAction(result);
			} else if (result.type === 'failure') {
				toast.error('An error has occurred');
			} else {
				applyAction(result);
			}
			isDeleting = false;
		};
	}}
>
	<button class="btn mt-4 bg-red-700">Delete Workspace</button>
</form>
