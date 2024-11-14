<script>
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    import Button from '$lib/components/ui/button/button.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

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

<div class="bg-background min-h-screen flex flex-col items-center">
    <Card class="w-full max-w-3xl mt-8">
        <CardHeader>
            <CardTitle>Location Search View</CardTitle>
        </CardHeader>
        <CardContent>
            <p class="text-sm text-muted-foreground mb-4">
                See and Set Locations
            </p>

            <div class="grid gap-4">
                <div class="border border-gray-300 rounded-lg p-4">
                    <h2 class="font-bold text-lg mb-4">View Locations</h2>
                    <div class="space-y-2">
                        <Button size="lg" on:click={() => redirectToLocationSpecific()}>Location 1</Button>
                        <Button size="lg" on:click={() => redirectToLocationSpecific()}>Location 2</Button>
                        <Button size="lg" on:click={() => redirectToLocationSpecific()}>Location 3</Button>
                    </div>
                </div>

                <div class="border border-gray-300 rounded-lg p-4">
                    <h2 class="font-bold text-lg mb-4">Create a New Location</h2>
                    <Button size="lg" on:click={redirectToCreateLocation}>Create New Location</Button>
                </div>
            </div>
        </CardContent>
    </Card>
</div>