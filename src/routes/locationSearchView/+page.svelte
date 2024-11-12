<script>
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
        goto('/locationSpecific');
    }

</script>

<div class="bg-background min-h-screen flex">
    <main class="container mx-auto px-4">
        <section class="text-center mb-16">
            <h1 class="text-5xl font-bold mb-4">Location Search View</h1>
            <p class="text-xl text-muted-foreground mb-8">See and Set Locations</p>
    
            <div class="container mx-auto text-center">
                <div class="flex">
                    <div class="flex-1 p-4">
                        <div class="border border-gray-300 rounded-lg p-6 shadow-lg">
                            <h2>View Locations</h2>
                            <section class="flex flex-col space-y-4">
                                <Button size="lg" on:click={redirectToLocationSpecific}>Location 1</Button>
                                <Button size="lg" on:click={redirectToLocationSpecific}>Location 2</Button>
                                <Button size="lg" on:click={redirectToLocationSpecific}>Location 3</Button>
                            </section>
                        </div>
                    </div>
                    
                    <div class="flex-1 p-4">
                        <div class="border border-gray-300 rounded-lg p-6 shadow-lg">
                            <section>
                                <Button size="lg" on:click={redirectToCreateLocation}>Create New Location</Button>
                            </section>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>

