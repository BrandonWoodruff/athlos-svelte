<script>
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '$lib/components/ui/card';
    import Button from '$lib/components/ui/button/button.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Search, Plus } from 'lucide-svelte';

    onMount(() => {
        console.log('Location Search View Loaded');
    });

    function redirectToCreateLocation() {
        goto('/createLocation');
    }

    function redirectToLocationSpecific() {
        goto(`/locationSpecific`);
    }
</script>
<div class="container mx-auto p-4">
    <h1 class="mb-6 text-3xl font-bold">Locations</h1>
    <div class="mb-6 flex items-center">
        <Input type="text" placeholder="Search locations..." class="mr-2" />
        <Search class="text-gray-400" />
    </div>

<div class="mb-6 grid grid-cols-1 gab-4 md:grid-cols-2 lg:grid-cols-3">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as location (location)}
        <Card class="group-card">
            <CardHeader>
                <CardTitle>Location {location}</CardTitle>
            </CardHeader>
            <CardContent>
                <p class="text-sm text-muted-foreground">Location Description</p>
            </CardContent>
            <CardFooter class="flex justify-between">
                <Button on:click={redirectToLocationSpecific}>View Location</Button>
            </CardFooter>
        </Card>
    {/each}
</div>
<Button on:click={redirectToCreateLocation} class="fixed bottom-4 right-4 mx-auto w-48"
		><Plus class="mr-2 h-4 w-4" /> Create New Location</Button
	>
</div>