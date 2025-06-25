<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { handlePopoverLink } from '$lib/utils';
	import { defineAbility, subject } from '@casl/ability';
	import defineAbilityFor from '$lib/ability';

	let { data }: { data: PageData } = $props();

	let isDeleting = $state(false);

	let ability = $derived(defineAbilityFor(data.user, data.workspaceAccess));
</script>

<h3>Settings</h3>
{#if ability.can('update', subject('Workspace', data.workspace))}
	<a onclick={handlePopoverLink('editWorkspace')} class="btn" href="/w/{data.workspace.id}/edit">
		Edit Workspace</a
	>
{/if}
{#if ability.can('delete', subject('Workspace', data.workspace))}
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
{/if}
