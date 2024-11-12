<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '$lib/components/ui/card';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { goto } from '$app/navigation';

    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';

    function redirectToLogin() {
        goto('/login');
    }

    function redirectToGroups() {
        goto('/groups');
    }

    function handleSubmit() {
        if (!name) {
            alert('Please enter your name.');
            return;
        }
        if (!email) {
            alert('Please enter your email.');
            return;
        }
        if (!password) {
            alert('Please enter your password.');
            return;
        }
        if (!confirmPassword) {
            alert('Please confirm your password.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        console.log('Sign up attempt:', { name, email, password, confirmPassword });
        redirectToGroups();
    }

    


    onMount(() => {
        const card = document.querySelector('.card');
        gsap.fromTo(card, 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.6 }
        );
    });
</script>

<div class="container mx-auto p-4 flex justify-center items-center min-h-screen">
    <Card class="w-full max-w-md card">
        <CardHeader>
            <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
            <form class="space-y-4">
                <div class="space-y-2">
                    <Label for="name">Name</Label>
                    <Input id="name" type="text" placeholder="Enter your name" required />
                </div>
                <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div class="space-y-2">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" required />
                </div>
                <div class="space-y-2">
                    <Label for="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm your password" required />
                </div>
                <Button type="submit" class="w-full">Sign Up</Button>
            </form>
        </CardContent>
        <CardFooter class="text-center">
            <p>Already have an account? <a href="/login" class="text-blue-500">Log In</a></p>
        </CardFooter>
    </Card>
</div>