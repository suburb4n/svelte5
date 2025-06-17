<script lang="ts">
	import type { PageProps } from './$types';
	import FormMessage from '$components/FormMessage.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { data, form }: PageProps = $props();
	let isSubmitting = $state(false);
</script>

<div class="p-5">
	<div class="card bg-base-200 prose border-base-300 w-full rounded-md border-1">
		<div class="card-body">
			{#if form?.message}
				<FormMessage message={form.message} />
			{/if}
			<form
				method="POST"
				action="?/createWorkspace"
				use:enhance={() => {
					isSubmitting = true;
					return ({ result, update }) => {
						if (result.type === 'failure') {
							toast.error((result.data?.message as string) || 'Failed to create workspace');
						} else if (result.type === 'redirect') {
							toast.success('Workspace created successfully!');
							goto(result.location, { invalidateAll: true });
						} else {
							applyAction(result);
						}
						isSubmitting = false;
						// update();
					};
				}}
			>
				<label for="ws-name">Name</label>
				<input
					id="ws-name"
					value={form?.name}
					name="name"
					class="input bg-base-200 w-full rounded-md"
					type="text"
				/>
				<button
					disabled={isSubmitting}
					class="btn btn-primary mt-4 w-full rounded-md"
					type="submit"
				>
					{#if isSubmitting}
						<span class="loading loading-spinner"></span>
					{/if}
					Submit</button
				>
			</form>
		</div>
	</div>
</div>
