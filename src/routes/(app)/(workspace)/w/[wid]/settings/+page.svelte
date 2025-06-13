<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h3>Settings</h3>
<!-- TODO: Check if user can update a workspace -->
<a class="btn" href="/w/{data.workspace.id}/edit"> Edit Workspace</a>
<!-- TODO: Add delete button -->
