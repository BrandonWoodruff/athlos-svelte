<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Textarea } from "$lib/components/ui/textarea";
    import { goto } from '$app/navigation';
    import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
    import { toast, Toaster } from "svelte-sonner";
    import { CircleAlert } from "lucide-svelte";
    import { groups } from "../../data";
    import { v4 as uuidv4 } from 'uuid';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';

    let name = "";
    let description = "";
    let error = "";
    let success = false;

    async function createGroup() {
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
        await goto('/groups');
        toast.success("Group created successfully!");
    }

    onMount(() => {
        const form = document.querySelector('form');
        gsap.fromTo(form, 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.6 }
        );
    });
</script>

<div class="container mx-auto p-4 max-w-3xl">
    <h1 class="text-2xl font-bold mb-4">Create a New Group</h1>

    <form on:submit|preventDefault={createGroup} class="space-y-4">
        <div class="space-y-2">
            <Label for="name">Group Name</Label>
            <Input type="text" id="name" bind:value={name} placeholder="Enter group name" />
        </div>

        <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea id="description" bind:value={description} placeholder="Enter group description" />
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