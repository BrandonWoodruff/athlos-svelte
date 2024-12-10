<script>
    import { onMount } from 'svelte';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Textarea } from "$lib/components/ui/textarea";
    import { goto } from '$app/navigation';
    import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
    import { toast, Toaster } from "svelte-sonner";
    import { CircleAlert } from "lucide-svelte";
    import { v4 as uuidv4 } from 'uuid';
    import { gsap } from 'gsap';

    onMount(() => {
        const form = document.querySelector('form');
        gsap.fromTo(form, 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.6 }
        );
    });

    let name = ''
    let description = ''
    let address = ''
    let email = ''
    let hours = ''
    let success = false
    let error = ''

    function createLocation() {
        error = "";
        success = false;

        if (!name.trim()) {
            error = "Group name is required";
            return;
        }
        else if(!description.trim()){
            error = "Group description is required"
            return
        }
        success = true;
        toast.success("Group created successfully!");
    }

    $: if (success) {
        name = "";
        description = "";
        goto('/locationSearchView');
    }
</script>

<div class="container mx-auto p-4 max-w-3xl">
    <h1 class="text-2xl font-bold mb-4">Create Location</h1>

    <form on:submit|preventDefault={createLocation} class="space-y-4">
        <div class="space-y-2">
            <Label for="name">Location Name</Label>
            <Input type="text" id="name" bind:value={name} placeholder="Enter Location Name" />
        </div>

        <div class="space-y-2">
            <Label for="description">Location Description</Label>
            <Textarea id="description" bind:value={description} placeholder="Enter Location Description" />
        </div>

        <div class="space-y-2">
            <Label for="description">Location Address</Label>
            <Textarea id="address" bind:value={address} placeholder="Enter Location Address" />
        </div>

        <div class="space-y-2">
            <Label for="description">Management Email</Label>
            <Textarea id="email" bind:value={email} placeholder="Enter Management Email" />
        </div>

        <div class="space-y-2">
            <Label for="description">Location Hours</Label>
            <Textarea id="hours" bind:value={hours} placeholder="Enter Location Hours" />
        </div>

        {#if error}
            <Alert variant="destructive">
                <CircleAlert class="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        {/if}

        <Button type="submit" class="w-full">Create Group</Button>
    </form>
</div>

<Toaster />