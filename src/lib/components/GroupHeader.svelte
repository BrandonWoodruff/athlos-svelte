<script lang="ts">
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { toast, Toaster } from 'svelte-sonner';

	export let group: { id: string; name: string; description: string };
	export let members;
	export let isLeader;
	import { onMount } from 'svelte';

	//disable the edit button by default
	let joinButton: HTMLButtonElement;
	let editButton: HTMLButtonElement;
	onMount(() => {
		editButton = document.getElementById('editButton') as HTMLButtonElement;
		editButton.disabled = true;
		joinButton = document.getElementById('joinButton') as HTMLButtonElement;
		joinButton.disabled = false;
	});

	function editGroup() {
		goto(`/groups/${group.id}/edit`);
	}
	let buttontext = "Join Group";
	function joinGroup() {
		// Implement join group logic
		console.log('Joining group:', group.name);
		toast.success(`You've joined ${group.name}!`);
		buttontext = "Joined Group";
		//disable the Join button
		joinButton.disabled = true;
		//enable the edit button
		editButton.disabled = false;
		
		//update the button to say Joined Group

	}
</script>

<Card class="mb-8 section">
	<CardHeader>
		<CardTitle>{group.name}</CardTitle>
		<CardDescription>{group.description}</CardDescription>
	</CardHeader>
	<CardContent>
		<p class="text-sm text-muted-foreground">Members: {members.length}</p>
	</CardContent>
	<CardFooter class="flex justify-between">
		<Button id='joinButton' on:click={joinGroup}>{buttontext}</Button>
		{#if isLeader}
			<Button id='editButton' on:click={editGroup}>Edit Group</Button>
		{/if}
	</CardFooter>
</Card>

<Toaster />
