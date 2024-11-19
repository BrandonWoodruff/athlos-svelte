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
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let searchQuery = '';
	let locations = [
		{ id: 1, name: 'Location A', description: 'Description of Location A' },
		{ id: 2, name: 'Location B', description: 'Description of Location B' },
		{ id: 3, name: 'Location C', description: 'Description of Location C' },
		{ id: 4, name: 'Location D', description: 'Description of Location D' }
	];

	$: filteredLocations = searchQuery
		? locations.filter((location) =>
				location.name.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: locations;

	function redirectToCreateLocation() {
		goto('/createLocation');
	}

	function routeToLocation(location: { id: number; name: string }) {
		goto(`/locationSpecific`);
	}

	onMount(() => {
		gsap.from('.location-card', {
			opacity: 0,
			y: 50,
			duration: 0.5,
			stagger: 0.2
		});
	});
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-3xl font-bold">Locations</h1>

	<div class="mb-6 flex items-center">
		<Input type="text" placeholder="Search locations..." class="mr-2" bind:value={searchQuery} />
		<Search class="text-gray-400" />
	</div>

	<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredLocations as location (location.id)}
			<Card class="location-card">
				<CardHeader>
					<CardTitle>{location.name}</CardTitle>
					<CardDescription>{location.description}</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="flex -space-x-4">
						{#each Array(3) as _}
							<Avatar class="border-2 border-white">
								<AvatarImage src="/images/user.png" alt="User avatar" />
								<AvatarFallback>L</AvatarFallback>
							</Avatar>
						{/each}
					</div>
				</CardContent>
				<CardFooter>
					<Button on:click={() => routeToLocation(location)} class="w-full">View Location</Button>
				</CardFooter>
			</Card>
		{/each}
	</div>

	<Button on:click={redirectToCreateLocation} class="fixed bottom-4 right-4 mx-auto w-48">
		<Plus class="mr-2 h-4 w-4" /> Create New Location
	</Button>
</div>
