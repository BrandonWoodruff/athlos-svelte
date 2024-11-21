<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Search, Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { groups as importedGroups } from '../data';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let groups = [...importedGroups]//allows us to render the page when groups deleted
	let searchQuery = '';
	let newGroupName = '';

	$: filteredGroups = searchQuery
		? groups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))
		: groups;

	function routeToPage(group: { id: number; name: string }) {
		goto(`/groups/${group.id}`);
	}

		
	function deleteGroup(groupId: number){
		groups = groups.filter((group) => group.id !== groupId)
	}

	function redirectToCreateGroup() {
		goto('/groups/create');
	}

	onMount(() => {
		gsap.from('.group-card', {
			opacity: 0,
			y: 50,
			duration: 0.5,
			stagger: 0.2
		});
	});
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-3xl font-bold">Groups</h1>

	<div class="mb-6 flex items-center">
		<Input type="text" placeholder="Search groups..." class="mr-2" bind:value={searchQuery} />
		<Search class="text-gray-400" />
	</div>

	<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredGroups as group (group.id)}
			<Card class="group-card">
				<CardHeader>
					<CardTitle class="flex items-center justify-between">
						{group.name}
						<Button on:click={()=>deleteGroup(group.id)}> <!-- h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer !-->
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4m-7 4h10" />
							</svg>
						</Button>
					</CardTitle>
					<CardDescription>{group.description}</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="flex -space-x-4">
						{#each Array(3) as _}
							<Avatar class="border-2 border-white">
								<AvatarImage src="/images/user.png" alt="User avatar" />
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
						{/each}
					</div>
				</CardContent>
				<CardFooter>
					<Button on:click={() => routeToPage(group)} class="w-full">View Group</Button>
				</CardFooter>
			</Card>
		{/each}
	</div>

	<Button on:click={redirectToCreateGroup} class="fixed bottom-4 right-4 mx-auto w-48"
		><Plus class="mr-2 h-4 w-4" /> Create New Group</Button
	>
</div>
