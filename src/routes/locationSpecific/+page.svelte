<script>
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation';
    import { Button } from '$lib/components/ui/button';

    function redirectToContactManagement() {
        goto('/contactManagement');
    }
    
    onMount(() => {
        console.log('Location Specific Page Loaded');
    });
</script>

<div class="bg-background min-h-screen flex">
    <main class="container mx-auto px-4">
        <section class="text-center mb-16">
            <h1 class="text-5xl font-bold mb-4">UVU Sports Center</h1>
            <p class="text-xl text-muted-foreground mb-8">Private Indoor court that is great for basketball!</p>
        
            <div class="flex flex-col items-center space-y-4">
                <div class="flex flex-col w-full max-w-md">
                    <label for="location-name" class="txt-lg font-semibold mb-2 text-decoration-line: underline">Location</label>
                    <label for="location-name" class="txt-lg font-semibold mb-2">Orem, Utah</label>
                </div>
                <div class="flex flex-col w-full max-w-md">
                    <label for="address" class="txt-lg font-semibold mb-2 text-decoration-line: underline">Address</label>
                    <label for="address" class="txt-lg font-semibold mb-2">1234 Main St.</label>
                </div>
                <div class="flex flex-col w-full max-w-md">
                    <label for="Hours" class="txt-lg font-semibold mb-2 text-decoration-line: underline"> Hours</label>
                    <label for="email" class="txt-lg font-semibold mb-2">Monday - Friday: 8:00 AM - 10:00 PM<br>Saturday: 8:00 AM - 8:00 PM <br>Sunday: Closed<br>
                    </label>
                </div>
                <div>
                <Button on:click={redirectToContactManagement}>Contact Management</Button>
                </div>
                <div class="flex flex-col w-full max-w-md">
                    <label for="pin-location" class="txt-lg font-semibold mb-2 text-decoration-line: underline">Location</label>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6087.525598393933!2d-111.71892992360303!3d40.28101906388739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d9b1faf329a5f%3A0xe25ac48a100272e0!2sFulton%20Library!5e0!3m2!1sen!2sus!4v1730755552754!5m2!1sen!2sus" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    </main>
</div>

