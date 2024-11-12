<script>
    import { onMount } from 'svelte';

    onMount(() => {
        console.log('Terms of Service Page Loaded');
    });
</script>

<div class="container mx-auto px-4 py-8">
    <section>
        <h1 class="text-4xl font-bold text-center mb-4">Terms of Service</h1>
        <p class="text-lg mb-4">
            This app is a fictional project developed for a class assignment and is not intended for real-world use. All features and functionalities are created solely for educational purposes.
        </p>
        <p class="text-lg mb-4">
            By accessing this app, you agree to use it solely for learning and demonstration. The creators of this app are not responsible for any misuse or misinterpretation of its functionality.
        </p>
        <p class="text-lg">
            Please note that this app does not collect or retain any user data and does not provide any actual service.
        </p>
    </section>
</div>
